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
    constructor(paymentRepository, courseService, couponService) {
        this.paymentRepository = paymentRepository;
        this.courseService = courseService;
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
    async create(args) {
        const { currency, paymentMethod, paymentUnits, userId, couponCode } = args.data;
        const courses = await this.courseService.findMany({
            where: {
                id: {
                    in: paymentUnits
                }
            },
            select: {
                id: true,
                price: true
            }
        });
        if (courses.length !== paymentUnits.length) {
            throw new APIError_1.default("One of the courses is not exist", HTTPStatusCode_1.default.BadRequest);
        }
        const totalPrice = courses.reduce((acc, curr) => {
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
                    create: courses.map(({ id, price }) => {
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
        });
    }
    ;
    async update(args) {
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
        });
    }
    ;
    deleteNotCompletedPayment(id) {
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
                await this.delete(id);
            }
        }, 1000 * 60 * 11); // 11 Min
    }
    ;
    delete(id) {
        return this.paymentRepository.delete(id);
    }
    ;
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IPaymentRepository')),
    __param(1, (0, inversify_1.inject)('ICourseService')),
    __param(2, (0, inversify_1.inject)('ICouponService'))
], PaymentService);
//# sourceMappingURL=PaymentService.js.map