"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentValidation = exports.addCommentValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.addCommentValidation = [
    (0, express_validator_1.body)("input.content")
        .notEmpty().withMessage("Content is required")
        .isString().withMessage("Content must be string"),
    (0, express_validator_1.body)("input.lessonId")
        .notEmpty().withMessage("LessonId is required")
        .isInt({ min: 1 }).withMessage("LessonId must be an integer number more than or equal to 1"),
    (0, express_validator_1.body)("input.parentId")
        .optional()
        .isInt({ min: 1 }).withMessage("ParentId must be an integer number more than or equal 1"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateCommentValidation = [
    (0, express_validator_1.body)("input.content")
        .optional()
        .isString().withMessage("Content must be string"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=commentValidator.js.map