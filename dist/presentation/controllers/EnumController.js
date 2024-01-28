"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumController = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let EnumController = class EnumController {
    constructor() {
        this.getAllEnums = (0, express_async_handler_1.default)(async (request, response, next) => {
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All Enums are retrieved successfully', [client_1.$Enums]));
        });
    }
    ;
};
exports.EnumController = EnumController;
exports.EnumController = EnumController = __decorate([
    (0, inversify_1.injectable)()
], EnumController);
//# sourceMappingURL=EnumController.js.map