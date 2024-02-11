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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const inversify_1 = require("inversify");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let PaymentService = class PaymentService {
    constructor(paymentRepository, cartService, couponService) {
        this.paymentRepository = paymentRepository;
        this.cartService = cartService;
        this.couponService = couponService;
    }
    async getCouponDiscount(couponCode) {
        const coupon = await this.couponService.findUnique({
            where: {
                code: couponCode
            },
            include: {
                payments: true
            }
        });
        if (coupon && coupon.expiredAt >= new Date()) {
            return coupon.discount;
        }
        return 0;
    }
    count(args) {
        return this.paymentRepository.count(args);
    }
    ;
    findMany(args) {
        return this.paymentRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.paymentRepository.findUnique(args);
    }
    ;
    async create(args, transaction) {
        const { currency, paymentMethod, userId, couponCode } = args.data;
        const cart = await this.cartService.findFirst({
            where: {
                student: {
                    userId
                }
            },
            select: {
                id: true,
                courses: {
                    select: {
                        id: true,
                        price: true
                    }
                }
            }
        });
        if (!cart || !cart.courses.length) {
            throw new APIError_1.default("Your cart is empty", HTTPStatusCode_1.default.BadRequest);
        }
        const totalPrice = cart.courses.reduce((acc, curr) => {
            return acc + curr.price;
        }, 0);
        let discount = couponCode ? await this.getCouponDiscount(couponCode) : 0;
        return this.paymentRepository.create({
            data: {
                currency,
                paymentMethod,
                totalPrice,
                discount,
                paymentUnits: {
                    create: cart.courses.map(({ id, price }) => {
                        return {
                            price,
                            courseId: id,
                        };
                    })
                },
                coupon: couponCode ? {
                    connect: {
                        code: couponCode
                    }
                } : undefined,
                student: {
                    connect: {
                        userId: userId
                    }
                }
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    async update(args, transaction) {
        const { id, status } = args.data;
        return this.paymentRepository.update({
            where: {
                id
            },
            data: {
                status: status || undefined
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    deleteNotCompletedPayment(id, transaction) {
        setTimeout(async () => {
            const payment = await this.paymentRepository.findUnique({
                where: {
                    id
                },
                select: {
                    status: true
                }
            });
            if (payment && payment.status !== "COMPLETE") {
                await this.delete(id, transaction);
            }
        }, 1000 * 60 * 11); // 11 Min
    }
    ;
    delete(id, transaction) {
        return this.paymentRepository.delete(id, transaction);
    }
    ;
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IPaymentRepository')),
    __param(1, (0, inversify_1.inject)('ICartService')),
    __param(2, (0, inversify_1.inject)('ICouponService'))
], PaymentService);
//# sourceMappingURL=PaymentService.js.map