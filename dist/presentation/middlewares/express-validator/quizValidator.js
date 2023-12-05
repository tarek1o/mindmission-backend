"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuizValidation = exports.addQuizValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
const client_1 = require("@prisma/client");
exports.addQuizValidation = [
    (0, express_validator_1.body)("input.title")
        .notEmpty().withMessage("Quiz title is required")
        .isString().withMessage("Quiz title must be a string")
        .isLength({ min: 5 }).withMessage("Too short quiz title, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long quiz title, 1000 characters at most"),
    (0, express_validator_1.body)("input.requiredTime")
        .notEmpty().withMessage("required time is required")
        .isFloat({ min: 0 }).withMessage("Required time must be a string"),
    (0, express_validator_1.body)("input.description")
        .optional()
        .isString().withMessage("Description must be string")
        .isLength({ min: 10 }).withMessage("Too short description, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long description, 1000 characters at most"),
    (0, express_validator_1.body)("input.questions")
        .notEmpty().withMessage("Questions are required")
        .isArray().withMessage("Quiz questions must be an array")
        .custom(questions => {
        questions.forEach((question) => {
            if (!question.questionText) {
                throw new Error("QuestionText is required");
            }
            if (typeof question.questionText !== "string") {
                throw new Error("QuestionText must be a string");
            }
            if (!question.choiceA) {
                throw new Error("ChoiceA is required");
            }
            if (typeof question.choiceA !== "string") {
                throw new Error("ChoiceA must be a string");
            }
            if (!question.choiceB) {
                throw new Error("ChoiceB is required");
            }
            if (typeof question.choiceB !== "string") {
                throw new Error("ChoiceB must be a string");
            }
            if (question.choiceC && typeof question.choiceC !== "string") {
                throw new Error("ChoiceC must be a string");
            }
            if (question.choiceD && typeof question.choiceD !== "string") {
                throw new Error("ChoiceD must be a string");
            }
            if (!question.correctAnswer) {
                throw new Error("CorrectAnswer is required");
            }
            if (!client_1.CorrectAnswer[question.correctAnswer]) {
                throw new Error(`CorrectAnswer can be ${Object.values(client_1.CorrectAnswer).toString()} only`);
            }
            if (question.order && !Number.isInteger(question.order)) {
                throw new Error('Question order must be an integer number');
            }
            if (!question.level) {
                throw new Error("Question level is required");
            }
            if (!client_1.QuestionLevel[question.level]) {
                const allowedQuestionLevels = Object.values(client_1.QuestionLevel).map(level => level.toLowerCase()).toString();
                throw new Error(`Question level can be ${allowedQuestionLevels} only`);
            }
        });
        return true;
    })
        .custom(questions => {
        const questionOrders = questions.map((question) => question.order);
        const uniqueQuestionOrders = Array.from(new Set(questionOrders));
        if (questionOrders.length !== uniqueQuestionOrders.length) {
            throw new Error("You can have more than one question with the same order");
        }
        return true;
    }),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateQuizValidation = [
    (0, express_validator_1.body)("input.title")
        .optional()
        .isString().withMessage("Quiz title must be a string")
        .isLength({ min: 5 }).withMessage("Too short quiz title, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long quiz title, 1000 characters at most"),
    (0, express_validator_1.body)("input.requiredTime")
        .optional()
        .isFloat({ min: 0 }).withMessage("Required time must be a string"),
    (0, express_validator_1.body)("input.description")
        .optional()
        .isString().withMessage("Description must be string")
        .isLength({ min: 10 }).withMessage("Too short description, 5 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long description, 1000 characters at most"),
    (0, express_validator_1.body)("input.questions")
        .optional()
        .isArray().withMessage("Quiz questions must be an array")
        .custom(questions => {
        questions.forEach((question) => {
            if (!question.questionText) {
                throw new Error("QuestionText is required");
            }
            if (typeof question.questionText !== "string") {
                throw new Error("QuestionText must be a string");
            }
            if (!question.choiceA) {
                throw new Error("ChoiceA is required");
            }
            if (typeof question.choiceA !== "string") {
                throw new Error("ChoiceA must be a string");
            }
            if (!question.choiceB) {
                throw new Error("ChoiceB is required");
            }
            if (typeof question.choiceB !== "string") {
                throw new Error("ChoiceB must be a string");
            }
            if (question.choiceC && typeof question.choiceC !== "string") {
                throw new Error("ChoiceC must be a string");
            }
            if (question.choiceD && typeof question.choiceD !== "string") {
                throw new Error("ChoiceD must be a string");
            }
            if (!question.correctAnswer) {
                throw new Error("CorrectAnswer is required");
            }
            if (!client_1.CorrectAnswer[question.correctAnswer]) {
                throw new Error(`CorrectAnswer can be ${Object.values(client_1.CorrectAnswer).toString()} only`);
            }
            if (question.order && !Number.isInteger(question.order)) {
                throw new Error('Question order must be an integer number');
            }
            if (!question.level) {
                throw new Error("Question level is required");
            }
            if (!client_1.QuestionLevel[question.level]) {
                const allowedQuestionLevels = Object.values(client_1.QuestionLevel).map(level => level.toLowerCase()).toString();
                throw new Error(`Question level can be ${allowedQuestionLevels} only`);
            }
        });
        return true;
    })
        .custom(questions => {
        const questionOrders = questions.map((question) => question.order);
        const uniqueQuestionOrders = Array.from(new Set(questionOrders));
        if (questionOrders.length !== uniqueQuestionOrders.length) {
            throw new Error("You can have more than one question with the same order");
        }
        return true;
    }),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=quizValidator.js.map