"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const paymentValidator_1 = require("../middlewares/express-validator/paymentValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllPayments, getPaymentById, createPayment, payMobPaymentConfirmation, payPalPaymentConfirmation, deletePayment } = DI_1.default.get('PaymentController');
const paymentRouter = express_1.default.Router();
paymentRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Payment', 'GET'), getAllPayments);
paymentRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Payment', 'GET'), getPaymentById);
paymentRouter.route("/pay")
    .post(isAuthenticated, isAuthorized('Payment', 'POST'), paymentValidator_1.payValidation, createPayment);
paymentRouter.route("/paymob/confirm")
    .post(payMobPaymentConfirmation);
paymentRouter.route("/paypal/confirm")
    .post(payPalPaymentConfirmation);
paymentRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Payment', 'DELETE'), deletePayment);
exports.default = paymentRouter;
//# sourceMappingURL=paymentRoutes.js.map