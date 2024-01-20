"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertRatingValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.upsertRatingValidation = [
    (0, express_validator_1.body)("input.courseId")
        .notEmpty().withMessage("Course Id is required")
        .isInt({ min: 1 }).withMessage('Course Id must be an integer number more than or equal to 1'),
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
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=ratingValidator.js.map