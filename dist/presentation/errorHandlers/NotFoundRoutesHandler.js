"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = __importDefault(require("./APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
class NotFoundRoutes {
}
NotFoundRoutes.catchRoute = (request, response, next) => {
    next(new APIError_1.default(`This route is not found: ${request.originalUrl}`, HTTPStatusCode_1.default.NotFound));
};
exports.default = NotFoundRoutes;
//# sourceMappingURL=NotFoundRoutesHandler.js.map