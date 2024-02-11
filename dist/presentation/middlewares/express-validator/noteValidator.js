"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertNoteValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.upsertNoteValidation = [
    (0, express_validator_1.body)("input.content")
        .notEmpty().withMessage("Content is required")
        .isString().withMessage("Content must be string"),
    (0, express_validator_1.body)("input.time")
        .notEmpty().withMessage("Time is required")
        .isInt({ min: 1 }).withMessage("Time must be a positive integer number"),
    (0, express_validator_1.body)("input.lessonId")
        .notEmpty().withMessage("LessonId is required")
        .isInt({ min: 1 }).withMessage("LessonId must be an integer number more than or equal to 1"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=noteValidator.js.map