"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseValidation = exports.addCourseValidation = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.addCourseValidation = [
    (0, express_validator_1.body)("input.title")
        .notEmpty().withMessage("Course title is required")
        .isString().withMessage("Course title must be string")
        .isLength({ min: 20 }).withMessage("Too short course title, 20 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long course title, 1000 characters at most"),
    (0, express_validator_1.body)("input.shortDescription")
        .notEmpty().withMessage("Short Description is required")
        .isString().withMessage('Description must be string')
        .isLength({ min: 10 }).withMessage("Short Description is too short, 10 characters at least")
        .isLength({ max: 1000 }).withMessage("Short Description is Too long, 500 characters at most"),
    (0, express_validator_1.body)("input.description")
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be string')
        .isLength({ min: 50 }).withMessage("Too short description, 50 characters at least"),
    (0, express_validator_1.body)("input.language")
        .notEmpty().withMessage("Language is required")
        .toUpperCase()
        .custom((value) => {
        if (!client_1.Language[value]) {
            const allowedLanguages = Object.values(client_1.Language).map(value => value.toLowerCase()).toString();
            throw new Error(`The Language can be ${allowedLanguages} only`);
        }
        return true;
    }),
    (0, express_validator_1.body)("input.level")
        .notEmpty().withMessage("Level is required")
        .toUpperCase()
        .custom((value) => {
        if (!client_1.CourseLevel[value]) {
            const allowedLevels = Object.values(client_1.CourseLevel).map(value => value.toLowerCase()).toString();
            throw new Error(`The levels can be ${allowedLevels} only`);
        }
        return true;
    }),
    (0, express_validator_1.body)("input.imageCover")
        .notEmpty().withMessage("Image cover is required")
        .isURL().withMessage('Invalid image cover formate, must be a url'),
    (0, express_validator_1.body)("input.requirements")
        .notEmpty().withMessage("Requirements are required")
        .isArray().withMessage('Requirements must be an array of strings')
        .custom(requirements => {
        requirements.forEach((requirement) => {
            if (typeof requirement !== 'string') {
                throw new Error(`${requirement} is not a string`);
            }
        });
        return true;
    }),
    (0, express_validator_1.body)("input.courseTeachings")
        .notEmpty().withMessage("Course Teachings are required")
        .isArray({ min: 1 }).withMessage('Course Teachings must be an array of strings')
        .custom(courseTeachings => {
        courseTeachings.forEach((courseTeachings) => {
            if (typeof courseTeachings !== 'string') {
                throw new Error(`${courseTeachings} is not a string`);
            }
        });
        return true;
    }),
    (0, express_validator_1.body)("input.price")
        .notEmpty().withMessage("Any course must have a price")
        .isFloat({ min: 0 }).withMessage('Price must be a floating number more than or equal 0'),
    (0, express_validator_1.body)("input.discountPercentage")
        .optional()
        .isFloat({ min: 0, max: 100 }).withMessage('Discount Percentage must be a floating number between 0 and 100'),
    (0, express_validator_1.body)("input.topicId")
        .notEmpty().withMessage('Any course must belong to a topic')
        .isInt().withMessage("TopicId must be an integer number"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateCourseValidation = [
    (0, express_validator_1.body)("input.title")
        .optional()
        .isString().withMessage("Course title must be string")
        .isLength({ min: 20 }).withMessage("Too short course title, 20 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long course title, 1000 characters at most"),
    (0, express_validator_1.body)("input.shortDescription")
        .optional()
        .isString().withMessage('Description must be string')
        .isLength({ min: 10 }).withMessage("Short Description is too short, 10 characters at least")
        .isLength({ max: 1000 }).withMessage("Short Description is Too long, 500 characters at most"),
    (0, express_validator_1.body)("input.description")
        .optional()
        .isString().withMessage('Description must be string')
        .isLength({ min: 50 }).withMessage("Too short description, 50 characters at least"),
    (0, express_validator_1.body)("input.language")
        .optional()
        .toUpperCase()
        .custom((value) => {
        if (!client_1.Language[value]) {
            const allowedLanguages = Object.values(client_1.Language).map(value => value.toLowerCase()).toString();
            throw new Error(`The Language can be ${allowedLanguages} only`);
        }
        return true;
    }),
    (0, express_validator_1.body)("input.level")
        .optional()
        .toUpperCase()
        .custom((value) => {
        if (!client_1.CourseLevel[value]) {
            const allowedLevels = Object.values(client_1.CourseLevel).map(value => value.toLowerCase()).toString();
            throw new Error(`The levels can be ${allowedLevels} only`);
        }
        return true;
    }),
    (0, express_validator_1.body)("input.imageCover")
        .optional()
        .isURL().withMessage('Invalid image cover formate, must be a url'),
    (0, express_validator_1.body)("input.requirements")
        .optional()
        .isArray().withMessage('Requirements must be an array of strings')
        .custom(requirements => {
        requirements.forEach((requirement) => {
            if (typeof requirement !== 'string') {
                throw new Error(`${requirement} is not a string`);
            }
        });
        return true;
    }),
    (0, express_validator_1.body)("input.courseTeachings")
        .optional()
        .isArray({ min: 1 }).withMessage('Course Teachings must be an array of strings')
        .custom(courseTeachings => {
        courseTeachings.forEach((courseTeachings) => {
            if (typeof courseTeachings !== 'string') {
                throw new Error(`${courseTeachings} is not a string`);
            }
        });
        return true;
    }),
    (0, express_validator_1.body)("input.price")
        .optional()
        .isFloat({ min: 0 }).withMessage('Price must be a floating number more than or equal 0'),
    (0, express_validator_1.body)("input.discountPercentage")
        .optional()
        .isFloat({ min: 0, max: 100 }).withMessage('Discount Percentage must be a floating number between 0 and 100'),
    (0, express_validator_1.body)("input.chapters")
        .optional()
        .isArray({ min: 1 }).withMessage("Chapters must be an array of chapter objects")
        .custom(chapters => {
        chapters.forEach((chapter) => {
            if (!chapter.id) {
                throw new Error('Any chapter object must have an id property');
            }
            if (!chapter.order) {
                throw new Error('Any chapter object must have an order property');
            }
            if (!Number.isInteger(chapter.id)) {
                throw new Error('Id value must be an integer number');
            }
            if (!Number.isInteger(chapter.order)) {
                throw new Error('Order value must be an integer number');
            }
            if (chapter.id <= 0) {
                throw new Error('Id value must be an integer number more than or equal 1');
            }
            if (chapter.order <= 0) {
                throw new Error('Order value must be an integer number more than or equal 1');
            }
        });
        return true;
    })
        .custom(chapters => {
        const chapterIds = chapters.map((chapter) => chapter.id);
        const uniqueChapterIds = Array.from(new Set(chapterIds));
        if (chapterIds.length !== uniqueChapterIds.length) {
            throw new Error('Please, make sure that any chapter id not repeated');
        }
        const chapterOrders = chapters.map((chapter) => chapter.order);
        const uniqueChapterOrders = Array.from(new Set(chapterOrders));
        if (chapterOrders.length !== uniqueChapterOrders.length) {
            throw new Error('There are more than one chapter with same order');
        }
        return true;
    }),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=courseValidator.js.map