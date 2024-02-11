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
exports.CouponService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const inversify_1 = require("inversify");
let CouponService = class CouponService {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }
    async generateRandomCode() {
        const codeLength = 6;
        let code = undefined;
        do {
            const randomCode = crypto_1.default.randomBytes(Math.ceil(codeLength)).toString('hex').slice(0, codeLength);
            const isCodeExist = await this.couponRepository.findUnique({
                where: {
                    code: randomCode
                },
                select: {
                    code: true
                }
            });
            if (!isCodeExist) {
                code = randomCode;
            }
        } while (!code);
        return code;
    }
    ;
    count(args) {
        return this.couponRepository.count(args);
    }
    ;
    findMany(args) {
        return this.couponRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.couponRepository.findUnique(args);
    }
    ;
    async create(args, transaction) {
        const { discount, expiredAt, userId } = args.data;
        const code = await this.generateRandomCode();
        return this.couponRepository.create({
            data: {
                code,
                discount,
                expiredAt,
                admin: {
                    connect: {
                        userId
                    }
                },
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    update(args, transaction) {
        const { id, discount, expiredAt } = args.data;
        return this.couponRepository.update({
            where: {
                id
            },
            data: {
                discount: discount || undefined,
                expiredAt: expiredAt || undefined,
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return this.couponRepository.delete(id, transaction);
    }
    ;
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICouponRepository'))
], CouponService);
//# sourceMappingURL=CouponService.js.map