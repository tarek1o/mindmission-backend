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
exports.MessageService = void 0;
const inversify_1 = require("inversify");
let MessageService = class MessageService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    count(args) {
        return this.messageRepository.count(args);
    }
    ;
    findMany(args) {
        return this.messageRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.messageRepository.findUnique(args);
    }
    ;
    create(args, transaction) {
        const { name, email, message } = args.data;
        return this.messageRepository.create({
            data: {
                name,
                email,
                message
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    update(args, transaction) {
        const { id, subject, reply, replierId } = args.data;
        return this.messageRepository.update({
            where: {
                id
            },
            data: {
                subject,
                reply: reply,
                isReplied: true,
                replier: {
                    connect: {
                        id: replierId
                    }
                }
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return this.messageRepository.delete(id, transaction);
    }
    ;
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IMessageRepository'))
], MessageService);
//# sourceMappingURL=MessageService.js.map