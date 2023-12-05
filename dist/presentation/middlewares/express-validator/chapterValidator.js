"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChapterValidation = exports.addChapterValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.addChapterValidation = [
    (0, express_validator_1.body)("input.title")
        .notEmpty().withMessage("Title is required")
        .isString().withMessage("Title must be string")
        .isLength({ min: 5 }).withMessage("Too short title, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long title, 1000 characters at most"),
    (0, express_validator_1.body)("input.description")
        .optional()
        .isString().withMessage("Description must be string")
        .isLength({ min: 10 }).withMessage("Too short description, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long description, 1000 characters at most"),
    (0, express_validator_1.body)("input.order")
        .notEmpty().withMessage("Order is required")
        .isInt({ min: 1 }).withMessage("Order must be an integer number more than or equal 1"),
    (0, express_validator_1.body)("input.courseId")
        .notEmpty().withMessage("CourseId is required")
        .isInt({ min: 1 }).withMessage("CourseId must be an integer number more than or equal 1"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateChapterValidation = [
    (0, express_validator_1.body)("input.title")
        .optional()
        .isString().withMessage("Title must be string")
        .isLength({ min: 5 }).withMessage("Too short title, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long title, 1000 characters at most"),
    (0, express_validator_1.body)("input.description")
        .optional()
        .isString().withMessage("Description must be string")
        .isLength({ min: 10 }).withMessage("Too short description, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long description, 1000 characters at most"),
    (0, express_validator_1.body)("input.lessons")
        .optional()
        .isArray({ min: 1 }).withMessage("Lessons must be an array of lesson objects")
        .custom(lessons => {
        lessons.forEach((lesson) => {
            if (!lesson.id) {
                throw new Error('Any lesson object must have an id property');
            }
            if (!lesson.order) {
                throw new Error('Any lesson object must have an order property');
            }
            if (!Number.isInteger(lesson.id)) {
                throw new Error('Id value must be an integer number');
            }
            if (!Number.isInteger(lesson.order)) {
                throw new Error('Order value must be an integer number');
            }
            if (lesson.id <= 0) {
                throw new Error('Id value must be an integer number more than or equal 1');
            }
            if (lesson.order <= 0) {
                throw new Error('Order value must be an integer number more than or equal 1');
            }
        });
        return true;
    })
        .custom(lessons => {
        const lessonIds = lessons.map((lesson) => lesson.id);
        const uniqueLessonIds = Array.from(new Set(lessonIds));
        if (lessonIds.length !== uniqueLessonIds.length) {
            throw new Error('Please, make sure that any lesson id not repeated');
        }
        const lessonOrders = lessons.map((lesson) => lesson.order);
        const uniqueLessonOrders = Array.from(new Set(lessonOrders));
        if (lessonOrders.length !== uniqueLessonOrders.length) {
            throw new Error('There are more than one lesson with same order');
        }
        return true;
    }),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=chapterValidator.js.map