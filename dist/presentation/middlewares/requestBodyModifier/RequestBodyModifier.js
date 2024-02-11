"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBodyModifier = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class RequestBodyModifier {
}
exports.RequestBodyModifier = RequestBodyModifier;
RequestBodyModifier.add = (...InsertObjects) => (0, express_async_handler_1.default)((request, response, next) => {
    for (const object of InsertObjects) {
        request.body.input = Object.assign(Object.assign({}, request.body.input), object);
    }
    next();
});
RequestBodyModifier.remove = (...keys) => (0, express_async_handler_1.default)((request, response, next) => {
    for (const key of keys) {
        delete request.body.input[key];
    }
    next();
});
//# sourceMappingURL=RequestBodyModifier.js.map