"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCertificateTemplateValidation = exports.createCertificateTemplateValidation = void 0;
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
exports.createCertificateTemplateValidation = [
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateCertificateTemplateValidation = [
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=certificateTemplateValidator.js.map