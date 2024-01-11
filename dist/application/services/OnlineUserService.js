"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineUserService = void 0;
const inversify_1 = require("inversify");
const Transaction_1 = require("../../infrastructure/Services/Transaction");
let OnlineUserService = class OnlineUserService {
    constructor(onlineUserRepository, userService) {
        this.onlineUserRepository = onlineUserRepository;
        this.userService = userService;
    }
    aggregate(args) {
        return this.onlineUserRepository.aggregate(args);
    }
    count(args) {
        return this.onlineUserRepository.count(args);
    }
    ;
    findMany(args) {
        return this.onlineUserRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.onlineUserRepository.findUnique(args);
    }
    ;
    async create(args) {
        const { socketId, userId } = args.data;
        return Transaction_1.Transaction.transact(async () => {
            const createdOnlineUser = await this.onlineUserRepository.upsert({
                where: {
                    socketId,
                    userId
                },
                create: {
                    socketId,
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                },
                update: {},
                select: args.select,
                include: args.include
            });
            const onlineUserDevices = await this.onlineUserRepository.count({
                where: {
                    userId
                }
            });
            if (onlineUserDevices === 1) {
                await this.userService.update({
                    data: {
                        id: userId,
                        isOnline: true
                    },
                    select: {
                        id: true
                    }
                });
            }
            return createdOnlineUser;
        });
    }
    ;
    async delete(socketId) {
        return Transaction_1.Transaction.transact(async () => {
            const deletedOnlineUser = await this.onlineUserRepository.delete({
                where: {
                    socketId,
                },
                select: {
                    id: true,
                    userId: true,
                }
            });
            const onlineUserDevices = await this.onlineUserRepository.count({
                where: {
                    userId: deletedOnlineUser.userId
                }
            });
            if (onlineUserDevices === 0) {
                this.userService.update({
                    data: {
                        id: deletedOnlineUser.userId,
                        isOnline: false
                    },
                    select: {
                        id: true
                    }
                });
            }
            return deletedOnlineUser;
        });
    }
    ;
};
exports.OnlineUserService = OnlineUserService;
exports.OnlineUserService = OnlineUserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IOnlineUserRepository')),
    __param(1, (0, inversify_1.inject)('IUserService'))
], OnlineUserService);
//# sourceMappingURL=OnlineUserService.js.map