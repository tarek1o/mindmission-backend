"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageByWhatsApp = exports.connect = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const whatsAppService_1 = require("../services/whatsAppService");
exports.connect = (0, express_async_handler_1.default)(async (request, response, next) => {
    const update = await (0, whatsAppService_1.login)();
    response.status(200).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Your message has been sent successfully', [update]));
});
exports.sendMessageByWhatsApp = (0, express_async_handler_1.default)(async (request, response, next) => {
    const { phone, message, image } = request.body;
    if (message) {
        await (0, whatsAppService_1.sendTextMessage)(phone, message);
    }
    if (image) {
        await (0, whatsAppService_1.sendImageMessage)(phone, image, message);
    }
    response.status(200).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Your message has been sent successfully'));
});
//# sourceMappingURL=whatsAppController.js.map