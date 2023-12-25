"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCouponValidation = exports.addCouponValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.addCouponValidation = [
    (0, express_validator_1.body)("input.discount")
        .notEmpty().withMessage("Discount is required")
        .isFloat({ min: 0, max: 100 }).withMessage("Discount must be a floating number between 0 and 100"),
    (0, express_validator_1.body)("input.expiredAt")
        .notEmpty().withMessage("ExpiredAt is required")
        .isISO8601().withMessage('ExpiredAt must be in yyyy-mm-ddThh:mm:ssZ format'),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateCouponValidation = [
    (0, express_validator_1.body)("input.discount")
        .optional()
        .isFloat({ min: 0, max: 100 }).withMessage("Discount must be a floating number between 0 and 100"),
    (0, express_validator_1.body)("input.expiredAt")
        .optional()
        .isDate().withMessage('ExpiredAt must be in date format'),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=couponValidator.js.map