"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticleValidation = exports.addArticleValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.addArticleValidation = [
    (0, express_validator_1.body)("input.title")
        .notEmpty().withMessage("Article title is required")
        .isString().withMessage("Article title must be string")
        .isLength({ min: 5 }).withMessage("Too short Article title, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long Article title, 1000 characters at most"),
    (0, express_validator_1.body)("input.content")
        .notEmpty().withMessage("Article content is required")
        .isString().withMessage("Article Content must be string"),
    (0, express_validator_1.body)("input.time")
        .notEmpty().withMessage("Time is required")
        .isInt({ min: 1 }).withMessage("Time must be a positive integer number"),
    (0, express_validator_1.body)("input.lessonId")
        .notEmpty().withMessage("LessonId is required")
        .isInt({ min: 1 }).withMessage("LessonId must be an integer number more than or equal to 1"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateArticleValidation = [
    (0, express_validator_1.body)("input.title")
        .optional()
        .isString().withMessage("Article title must be string")
        .isLength({ min: 5 }).withMessage("Too short Article title, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long Article title, 1000 characters at most"),
    (0, express_validator_1.body)("input.content")
        .optional()
        .isString().withMessage("Article Content must be string"),
    (0, express_validator_1.body)("input.time")
        .optional()
        .isInt({ min: 1 }).withMessage("Time must be a positive integer number"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=articleValidator.js.map