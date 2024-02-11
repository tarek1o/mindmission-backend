"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessageValidation = exports.addMessageValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.addMessageValidation = [
    (0, express_validator_1.body)("input.name")
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be string"),
    (0, express_validator_1.body)("input.email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage('Invalid email'),
    (0, express_validator_1.body)("input.message")
        .notEmpty().withMessage("Message property is required")
        .isString().withMessage("Message property must be a string"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateMessageValidation = [
    (0, express_validator_1.body)("input.subject")
        .notEmpty().withMessage("Subject is required")
        .isString().withMessage("Subject must be string"),
    (0, express_validator_1.body)("input.reply")
        .notEmpty().withMessage("Reply is required")
        .isString().withMessage("Reply must be string"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=messageValidator.js.map