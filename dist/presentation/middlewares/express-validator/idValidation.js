"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.idValidation = [
    (0, express_validator_1.param)("id")
        .isInt({ min: 1 }).withMessage('Invalid id format, must be an integer number more than or equal to 1'),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors,
];
//# sourceMappingURL=idValidation.js.map