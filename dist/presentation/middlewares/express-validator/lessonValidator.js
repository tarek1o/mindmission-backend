"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLessonValidation = exports.addLessonValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.addLessonValidation = [
    (0, express_validator_1.body)("input.title")
        .notEmpty().withMessage("Lesson title is required")
        .isString().withMessage("Lesson title must be string")
        .isLength({ min: 5 }).withMessage("Too short Lesson title, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long Lesson title, 1000 characters at most"),
    (0, express_validator_1.body)("input.isFree")
        .optional()
        .isBoolean().withMessage("isFree property must be a boolean value"),
    (0, express_validator_1.body)("input.isAvailable")
        .optional()
        .isBoolean().withMessage("isAvailable property must be a boolean value"),
    (0, express_validator_1.body)("input.attachment")
        .optional()
        .isURL().withMessage("Lesson Attachment must be a url formate"),
    (0, express_validator_1.body)("input.order")
        .notEmpty().withMessage("Order is required")
        .isInt({ min: 1 }).withMessage("Order must be an integer number more than or equal to 1"),
    (0, express_validator_1.body)("input.sectionId")
        .notEmpty().withMessage("sectionId is required")
        .isInt({ min: 1 }).withMessage("sectionId must be an integer number more than or equal to 1"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateLessonValidation = [
    (0, express_validator_1.body)("input.title")
        .optional()
        .isString().withMessage("Lesson title must be string")
        .isLength({ min: 5 }).withMessage("Too short Lesson title, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long Lesson title, 1000 characters at most"),
    (0, express_validator_1.body)("input.isFree")
        .optional()
        .isBoolean().withMessage("isFree property must be a boolean value"),
    (0, express_validator_1.body)("input.isAvailable")
        .optional()
        .isBoolean().withMessage("isAvailable property must be a boolean value"),
    (0, express_validator_1.body)("input.attachment")
        .optional()
        .isURL().withMessage("Lesson Attachment must be a url formate"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=lessonValidator.js.map