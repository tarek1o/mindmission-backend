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
exports.CartService = void 0;
const inversify_1 = require("inversify");
let CartService = class CartService {
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    count(args) {
        return this.cartRepository.count(args);
    }
    ;
    findMany(args) {
        return this.cartRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.cartRepository.findUnique(args);
    }
    ;
    findFirst(args) {
        return this.cartRepository.findFirst(args);
    }
    async update(args, transaction) {
        const { userId, courseIds } = args.data;
        const cart = await this.cartRepository.findFirst({
            where: {
                student: {
                    userId
                }
            },
            select: {
                studentId: true,
                courses: {
                    select: {
                        id: true
                    }
                }
            }
        });
        return this.cartRepository.update({
            where: {
                studentId: cart.studentId
            },
            data: {
                courses: {
                    disconnect: (cart === null || cart === void 0 ? void 0 : cart.courses.length) ? cart.courses.map(({ id }) => ({ id })) : undefined,
                    connect: courseIds.map(id => ({ id }))
                }
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICartRepository'))
], CartService);
//# sourceMappingURL=CartService.js.map