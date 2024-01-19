"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnrollmentValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.updateEnrollmentValidation = [
    (0, express_validator_1.body)("input.courseId")
        .notEmpty().withMessage("CourseId is required")
        .isInt({ min: 1 }).withMessage("CourseId must be an integer number more than or equal to 1"),
    (0, express_validator_1.body)("input.lessonId")
        .notEmpty().withMessage("LessonId is required")
        .isInt({ min: 1 }).withMessage("LessonId must be an integer number more than or equal to 1"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=enrollmentValidator.js.map