"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
const library_1 = require("@prisma/client/runtime/library");
class GlobalErrorHandler {
    static catchError(error, request, response, next) {
        var _a;
        error.status = 'Error';
        if (!error.statusCode) {
            error.statusCode = HTTPStatusCode_1.default.InternalServerError;
        }
        if (error instanceof library_1.PrismaClientValidationError || error instanceof library_1.PrismaClientKnownRequestError) {
            const errorMessage = error.message.split('\n');
            error.message = errorMessage[errorMessage.length - 1].split('?')[0];
            error.statusCode = HTTPStatusCode_1.default.BadRequest;
        }
        if (((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "development") {
            GlobalErrorHandler.sendErrorForDev(error, response);
        }
        else {
            GlobalErrorHandler.sendErrorForProd(error, response);
        }
    }
    ;
}
GlobalErrorHandler.sendErrorForDev = (error, response) => response.status(error.statusCode).json({
    status: error.status,
    name: error.name,
    message: error.message,
    stack: error.stack,
});
GlobalErrorHandler.sendErrorForProd = (error, response) => response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
});
exports.default = GlobalErrorHandler;
//# sourceMappingURL=GlobalErrorHandler.js.map