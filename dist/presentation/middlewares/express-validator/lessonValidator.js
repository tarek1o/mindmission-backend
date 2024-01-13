"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLessonValidation = exports.addLessonValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
const client_1 = require("@prisma/client");
exports.addLessonValidation = [
    (0, express_validator_1.body)("input.title")
        .notEmpty().withMessage("Lesson title is required")
        .isString().withMessage("Lesson title must be string")
        .isLength({ min: 5 }).withMessage("Too short Lesson title, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long Lesson title, 1000 characters at most"),
    (0, express_validator_1.body)("input.isFree")
        .optional()
        .isBoolean().withMessage("isFree property must be a boolean value"),
    (0, express_validator_1.body)("input.attachment")
        .optional()
        .isURL().withMessage("Lesson Attachment must be a url formate"),
    (0, express_validator_1.body)("input.order")
        .notEmpty().withMessage("Order is required")
        .isInt({ min: 1 }).withMessage("Order must be an integer number more than or equal to 1"),
    (0, express_validator_1.body)("input.lessonType")
        .notEmpty().withMessage("Lesson type is required")
        .toUpperCase()
        .custom(value => {
        if (!client_1.LessonType[value]) {
            const allowedLessonTypes = Object.values(client_1.LessonType).map(value => value.toLowerCase()).toString();
            throw new Error(`The lesson types can be ${allowedLessonTypes} only`);
        }
        return true;
    }),
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
    (0, express_validator_1.body)("input.attachment")
        .optional()
        .isURL().withMessage("Lesson Attachment must be a url formate"),
    (0, express_validator_1.body)("input.lessonType")
        .optional()
        .toUpperCase()
        .custom(value => {
        if (!client_1.LessonType[value]) {
            const allowedLessonTypes = Object.values(client_1.LessonType).map(value => value.toLowerCase()).toString();
            throw new Error(`The lesson types can be ${allowedLessonTypes} only`);
        }
        return true;
    }),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=lessonValidator.js.map