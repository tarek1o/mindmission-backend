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
exports.LogController = void 0;
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const RequestManager_1 = require("../services/RequestManager");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let LogController = class LogController {
    constructor(logService) {
        this.logService = logService;
        this.getAllLogs = (0, express_async_handler_1.default)(async (request, response, next) => {
            const findOptions = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const promiseResult = await Promise.all([
                this.logService.findMany(findOptions),
                this.logService.count({ where: findOptions.where })
            ]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All logs are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
        });
        this.getLogById = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const role = await this.logService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select,
                include
            });
            if (!role) {
                throw new APIError_1.default('This log does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The log is retrieved successfully', [role]));
        });
    }
    ;
};
exports.LogController = LogController;
exports.LogController = LogController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ILogService'))
], LogController);
//# sourceMappingURL=LogController.js.map