"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssoValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.ssoValidation = [
    (0, express_validator_1.body)("input.code")
        .notEmpty().withMessage("'code' is required")
        .isString().withMessage("'code' must be string"),
    (0, express_validator_1.body)("input.redirectURL")
        .notEmpty().withMessage("'redirectURL' is required"),
    // .isURL().withMessage("'redirectURL' must be a url"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=ssoValidator.js.map