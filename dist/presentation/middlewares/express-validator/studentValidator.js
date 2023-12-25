"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateValidation = exports.enrollValidation = exports.wishlistValidation = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.wishlistValidation = [
    (0, express_validator_1.body)("input.courseId")
        .notEmpty().withMessage('CourseId is required')
        .isInt({ min: 1 }).withMessage("CourseId must be an integer number more than or equal to 1"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.enrollValidation = [
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
    (0, express_validator_1.body)("input.paymentUnits")
        .notEmpty().withMessage('Payment Units are required')
        .isArray().withMessage('Payment Units must be an array of integer numbers')
        .custom(paymentUnits => {
        for (const unit of paymentUnits) {
            if (!Number.isInteger(unit) || unit < 1) {
                throw new Error("Payment Units must be an array of positive integer numbers");
            }
        }
        return true;
    }),
    (0, express_validator_1.body)("input.couponCode")
        .optional()
        .isString().withMessage('Coupon code must be a string'),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.rateValidation = [
    (0, express_validator_1.body)("input.courseRate")
        .optional()
        .isFloat({ min: 1, max: 5 }).withMessage("Course rate must be a float number between 1 and 5"),
    (0, express_validator_1.body)("input.instructorRate")
        .optional()
        .isFloat({ min: 1, max: 5 }).withMessage("Instructor rate must be a float number between 1 and 5"),
    (0, express_validator_1.body)("input.commentForCourse")
        .optional()
        .isString().withMessage('Coupon code must be a string'),
    (0, express_validator_1.body)("input.commentForInstructor")
        .optional()
        .isString().withMessage('Coupon code must be a string'),
    (0, express_validator_1.body)("input.courseId")
        .notEmpty().withMessage("Course Id is required")
        .isInt({ min: 1 }).withMessage('Course Id must be an integer number more than or equal to 1'),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=studentValidator.js.map