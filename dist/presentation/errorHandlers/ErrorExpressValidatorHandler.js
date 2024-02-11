"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_result_1 = require("express-validator/src/validation-result");
const GlobalErrorHandler_1 = __importDefault(require("./GlobalErrorHandler"));
const APIError_1 = __importDefault(require("./APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
class ExpressErrorValidator {
    static catchExpressValidatorErrors(request, response, next) {
        const errors = (0, validation_result_1.validationResult)(request);
        if (!errors.isEmpty()) {
            const errorMessage = errors.array()[0].msg;
            GlobalErrorHandler_1.default.catchError(new APIError_1.default(errorMessage, HTTPStatusCode_1.default.BadRequest), request, response, next);
            return;
        }
        next();
    }
}
exports.default = ExpressErrorValidator;
//# sourceMappingURL=ErrorExpressValidatorHandler.js.map