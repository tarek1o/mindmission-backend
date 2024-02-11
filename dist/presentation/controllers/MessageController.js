"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const RequestManager_1 = require("../services/RequestManager");
const SendEmail_1 = require("../services/SendEmail");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let MessageController = class MessageController {
    constructor(messageService, logService) {
        this.messageService = messageService;
        this.logService = logService;
        this.getAllMessages = (0, express_async_handler_1.default)(async (request, response, next) => {
            const findOptions = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const promiseResult = await Promise.all([
                this.messageService.findMany(findOptions),
                this.messageService.count({ where: findOptions.where })
            ]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All Messages are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
        });
        this.getMessageById = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const message = await this.messageService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select,
                include
            });
            if (!message) {
                throw new APIError_1.default('This message does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The message is retrieved successfully', [message]));
        });
        this.createMessage = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { name, email, message } = request.body.input;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const createdMessage = await this.messageService.create({ data: { name, email, message }, select, include });
            response.status(HTTPStatusCode_1.default.Created).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Your message is received successfully', [createdMessage]));
        });
        this.updateMessage = (0, express_async_handler_1.default)(async (request, response, next) => {
            var _a;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const { subject, reply } = request.body.input;
            const message = await this.messageService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select: {
                    email: true,
                }
            });
            if (!message) {
                throw new APIError_1.default("This message is not exist", HTTPStatusCode_1.default.BadRequest);
            }
            const updatedMessage = await this.messageService.update({
                data: {
                    id: +request.params.id,
                    subject,
                    reply,
                    replierId: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id
                },
                select,
                include,
            });
            await SendEmail_1.SendEmail.send({ to: message.email, subject, message: reply });
            this.logService.log("UPDATE", "MESSAGE", Object.assign({ id: +request.params.id }, request.body.input), request.user);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The Message is replied successfully', [updatedMessage]));
        });
        this.deleteMessage = (0, express_async_handler_1.default)(async (request, response, next) => {
            const deletedMessage = await this.messageService.delete(+request.params.id);
            this.logService.log("DELETE", "MESSAGE", deletedMessage, request.user);
            response.status(HTTPStatusCode_1.default.NoContent).json();
        });
    }
    ;
};
exports.MessageController = MessageController;
exports.MessageController = MessageController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IMessageService')),
    __param(1, (0, inversify_1.inject)('ILogService'))
], MessageController);
//# sourceMappingURL=MessageController.js.map