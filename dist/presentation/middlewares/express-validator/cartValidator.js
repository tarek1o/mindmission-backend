"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertCartValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.upsertCartValidation = [
    (0, express_validator_1.body)("input.courseIds")
        .notEmpty().withMessage("courseIds is required")
        .isArray({ min: 1 }).withMessage("courseIds is an array of integer numbers"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=cartValidator.js.map