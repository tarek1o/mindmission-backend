"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoValidation = exports.addVideoValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.addVideoValidation = [
    (0, express_validator_1.body)("input.title")
        .notEmpty().withMessage("Video title is required")
        .isString().withMessage("Video title must be string")
        .isLength({ min: 5 }).withMessage("Too short Video title, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long Video title, 1000 characters at most"),
    (0, express_validator_1.body)("input.description")
        .optional()
        .isString().withMessage("Video Description must be string")
        .isLength({ max: 1000 }).withMessage("Too long video description, 1000 characters at most"),
    (0, express_validator_1.body)("input.url")
        .notEmpty().withMessage("Video URL is required")
        .isURL().withMessage("Video URL must be a url formate"),
    (0, express_validator_1.body)("input.time")
        .notEmpty().withMessage("Time is required")
        .isInt({ min: 1 }).withMessage("Time must be an integer number more than or equal to 1"),
    (0, express_validator_1.body)("input.lessonId")
        .notEmpty().withMessage("LessonId is required")
        .isInt({ min: 1 }).withMessage("LessonId must be an integer number more than or equal to 1"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateVideoValidation = [
    (0, express_validator_1.body)("input.title")
        .optional()
        .isString().withMessage("Video title must be string")
        .isLength({ min: 5 }).withMessage("Too short Video title, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long Video title, 1000 characters at most"),
    (0, express_validator_1.body)("input.description")
        .optional()
        .isString().withMessage("Video Description must be string")
        .isLength({ max: 1000 }).withMessage("Too long video description, 1000 characters at most"),
    (0, express_validator_1.body)("input.url")
        .optional()
        .isURL().withMessage("Video URL must be a url formate"),
    (0, express_validator_1.body)("input.time")
        .optional()
        .isInt({ min: 1 }).withMessage("Time must be an integer number more than or equal to 1"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=videoValidator.js.map