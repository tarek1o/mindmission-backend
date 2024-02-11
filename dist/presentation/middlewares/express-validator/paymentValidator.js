"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payValidation = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.payValidation = [
    (0, express_validator_1.body)("input.currency")
        .notEmpty().withMessage("Currency is required")
        .toUpperCase()
        .custom((value) => {
        if (!client_1.Currency[value]) {
            throw new Error(`Currency can be ${Object.values(client_1.Currency).map(value => value.toLowerCase()).toString()} only`);
        }
        return true;
    }),
    (0, express_validator_1.body)("input.paymentMethod")
        .notEmpty().withMessage("Payment Method is required")
        .toUpperCase()
        .custom((value) => {
        if (!client_1.PaymentMethod[value]) {
            throw new Error(`Payment Method can be ${Object.values(client_1.PaymentMethod).map(value => value.toLowerCase()).toString()} only`);
        }
        return true;
    }),
    (0, express_validator_1.body)("input.couponCode")
        .optional()
        .isString().withMessage('Coupon code must be a string'),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=paymentValidator.js.map