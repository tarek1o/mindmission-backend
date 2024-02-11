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
exports.PaymentController = void 0;
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = require("@prisma/client");
const PayMob_1 = require("../services/PayMob");
const PayPal_1 = require("../services/PayPal");
const RequestManager_1 = require("../services/RequestManager");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let PaymentController = class PaymentController {
    constructor(paymentService, studentService, logService) {
        this.paymentService = paymentService;
        this.studentService = studentService;
        this.logService = logService;
        this.getPaymentEnums = (0, express_async_handler_1.default)((request, response, next) => {
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All payment enums are retrieved successfully', [client_1.$Enums.PaymentMethod, client_1.$Enums.Currency]));
        });
        this.getAllPayments = (0, express_async_handler_1.default)(async (request, response, next) => {
            const findOptions = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const promiseResult = await Promise.all([
                this.paymentService.findMany(findOptions),
                this.paymentService.count({ where: findOptions.where })
            ]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All Payments are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
        });
        this.getPaymentById = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const Payment = await this.paymentService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select,
                include
            });
            if (!Payment) {
                throw new APIError_1.default('This Payment does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The Payment is retrieved successfully', [Payment]));
        });
        this.createPayment = (0, express_async_handler_1.default)(async (request, response, next) => {
            var _a;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const payment = await this.paymentService.create({
                data: Object.assign(Object.assign({}, request.body.input), { userId: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id }),
                select,
                include: Object.assign(Object.assign({}, include), { paymentUnits: {
                        include: {
                            course: true
                        }
                    } })
            });
            const orderItems = payment.paymentUnits;
            let res;
            if (request.body.input.paymentMethod === client_1.PaymentMethod.CARD) {
                const paymentToken = await PayMob_1.PayMob.createPaymentOrder(payment.id, payment.totalPrice, payment.currency, payment.discount, orderItems);
                res = ResponseFormatter_1.ResponseFormatter.formate(true, 'The payment token is created successfully', [{ payment, paymentToken }]);
            }
            else {
                const paymentSessionId = await PayPal_1.PayPal.createPaymentOrder(payment.id, payment.totalPrice, "USD", payment.discount, orderItems);
                res = ResponseFormatter_1.ResponseFormatter.formate(true, 'The payment session is created successfully', [{ payment, paymentSessionId }]);
            }
            this.paymentService.deleteNotCompletedPayment(payment.id);
            response.status(HTTPStatusCode_1.default.Created).json(res);
        });
        this.payMobPaymentConfirmation = (0, express_async_handler_1.default)(async (request, response, next) => {
            if (!PayMob_1.PayMob.isValidRequest(request)) {
                throw new APIError_1.default("Invalid PayMob Request", HTTPStatusCode_1.default.Forbidden);
            }
            const paymentId = PayMob_1.PayMob.getPaymentId(request);
            await this.paymentConfirmation(paymentId);
            response.status(HTTPStatusCode_1.default.OK).send(ResponseFormatter_1.ResponseFormatter.formate(true, "The payment is confirmed successfully"));
        });
        this.payPalPaymentConfirmation = (0, express_async_handler_1.default)(async (request, response, next) => {
            if (!await PayPal_1.PayPal.isValidRequest(request)) {
                throw new APIError_1.default("Invalid PayPal Request", HTTPStatusCode_1.default.Forbidden);
            }
            const paymentId = PayPal_1.PayPal.getPaymentId(request);
            await this.paymentConfirmation(paymentId);
            response.status(HTTPStatusCode_1.default.OK).send(ResponseFormatter_1.ResponseFormatter.formate(true, "The payment is confirmed successfully"));
        });
        this.deletePayment = (0, express_async_handler_1.default)(async (request, response, next) => {
            const deletedPayment = await this.paymentService.delete(+request.params.id);
            this.logService.log('DELETE', "PAYMENT", deletedPayment, request.user);
            response.status(HTTPStatusCode_1.default.NoContent).json();
        });
    }
    ;
    async paymentConfirmation(paymentId) {
        var _a;
        const updatedPayment = await this.paymentService.update({
            data: {
                id: paymentId,
                status: 'COMPLETE'
            },
            select: {
                id: true,
                status: true,
                student: {
                    select: {
                        userId: true
                    }
                },
                paymentUnits: {
                    select: {
                        courseId: true
                    }
                }
            }
        });
        const enrolledCourses = (_a = updatedPayment === null || updatedPayment === void 0 ? void 0 : updatedPayment.paymentUnits) === null || _a === void 0 ? void 0 : _a.map((unit) => unit.courseId);
        await this.studentService.update({ data: { userId: updatedPayment.student.userId, enrolledCourses } });
    }
    ;
};
exports.PaymentController = PaymentController;
exports.PaymentController = PaymentController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IPaymentService')),
    __param(1, (0, inversify_1.inject)('IStudentService')),
    __param(2, (0, inversify_1.inject)('ILogService'))
], PaymentController);
//# sourceMappingURL=PaymentController.js.map