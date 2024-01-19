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
exports.EnrollmentController = void 0;
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const RequestManager_1 = require("../services/RequestManager");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let EnrollmentController = class EnrollmentController {
    constructor(enrollmentService, logService) {
        this.enrollmentService = enrollmentService;
        this.logService = logService;
        this.getAllEnrollments = (0, express_async_handler_1.default)(async (request, response, next) => {
            const findOptions = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const promiseResult = await Promise.all([
                this.enrollmentService.findMany(findOptions),
                this.enrollmentService.count({ where: findOptions.where })
            ]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All enrollment info are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
        });
        this.getEnrollmentById = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const enrollment = await this.enrollmentService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select,
                include
            });
            if (!enrollment) {
                throw new APIError_1.default('This enrollment does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The enrollment is retrieved successfully', [enrollment]));
        });
        this.updateEnrollment = (0, express_async_handler_1.default)(async (request, response, next) => {
            var _a;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const updateEnrollment = await this.enrollmentService.update({
                data: Object.assign(Object.assign({}, request.body.input), { userId: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id }),
                select,
                include
            });
            this.logService.log('UPDATE', 'ENROLLMENT', Object.assign(Object.assign({}, request.body.input), { id: updateEnrollment.id }), request.user);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The enrollment is updated successfully', [updateEnrollment]));
        });
        this.deleteEnrollment = (0, express_async_handler_1.default)(async (request, response, next) => {
            const deletedEnrollment = await this.enrollmentService.delete(+request.params.id);
            this.logService.log('DELETE', 'ENROLLMENT', deletedEnrollment, request.user);
            response.status(HTTPStatusCode_1.default.NoContent).json();
        });
    }
    ;
};
exports.EnrollmentController = EnrollmentController;
exports.EnrollmentController = EnrollmentController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IEnrollmentService')),
    __param(1, (0, inversify_1.inject)('ILogService'))
], EnrollmentController);
//# sourceMappingURL=EnrollmentController.js.map