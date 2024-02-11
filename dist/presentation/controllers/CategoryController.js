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
exports.CategoryController = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const RequestManager_1 = require("../services/RequestManager");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let CategoryController = class CategoryController {
    constructor(categoryService, logService) {
        this.categoryService = categoryService;
        this.logService = logService;
        this.getCategoryEnums = (0, express_async_handler_1.default)((request, response, next) => {
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All category enums are retrieved successfully', [client_1.$Enums.CategoryType]));
        });
        this.getAllCategories = (0, express_async_handler_1.default)(async (request, response, next) => {
            const findOptions = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const promiseResult = await Promise.all([
                this.categoryService.findMany(findOptions),
                this.categoryService.count({ where: findOptions.where })
            ]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All categories are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
        });
        this.getCategoryById = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const category = await this.categoryService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select,
                include
            });
            if (!category) {
                throw new APIError_1.default('This category does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The category is retrieved successfully', [category]));
        });
        this.createCategory = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const { type } = request.body.input;
            const createdCategory = await this.categoryService.create({ data: request.body.input, select: Object.assign(Object.assign({}, select), { id: true }), include });
            this.logService.log('ADD', type, createdCategory, request.user);
            if (!select.id) {
                Reflect.deleteProperty(createdCategory, "id");
            }
            response.status(HTTPStatusCode_1.default.Created).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The category is created successfully', [createdCategory]));
        });
        this.updateCategory = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const updatedCategory = await this.categoryService.update({ data: Object.assign(Object.assign({}, request.body.input), { id: +request.params.id }), select: Object.assign(Object.assign({}, select), { type: true }), include });
            this.logService.log('UPDATE', updatedCategory.type, Object.assign(Object.assign({}, request.body.input), { id: +request.params.id }), request.user);
            if (!select.type) {
                Reflect.deleteProperty(updatedCategory, "type");
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The category is updated successfully', [updatedCategory]));
        });
        this.deleteCategory = (0, express_async_handler_1.default)(async (request, response, next) => {
            const deletedCategory = await this.categoryService.delete(+request.params.id);
            this.logService.log('DELETE', deletedCategory.type, deletedCategory, request.user);
            response.status(HTTPStatusCode_1.default.NoContent).json();
        });
    }
    ;
};
exports.CategoryController = CategoryController;
exports.CategoryController = CategoryController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICategoryService')),
    __param(1, (0, inversify_1.inject)('ILogService'))
], CategoryController);
//# sourceMappingURL=CategoryController.js.map