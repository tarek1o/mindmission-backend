"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCertificateValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.updateCertificateValidation = [
    (0, express_validator_1.body)("input.imgUrl")
        .notEmpty().withMessage("imgUrl is required")
        .isURL().withMessage("imgUrl must be a URL"),
    (0, express_validator_1.body)("input.pdfUrl")
        .notEmpty().withMessage("pdfUrl is required")
        .isURL().withMessage("pdfUrl must be a URL"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=certificateValidator.js.map