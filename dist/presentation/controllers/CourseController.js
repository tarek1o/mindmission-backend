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
exports.CourseController = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const RequestManager_1 = require("../services/RequestManager");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let CourseController = class CourseController {
    constructor(courseService, logService) {
        this.courseService = courseService;
        this.logService = logService;
        this.getCourseEnums = (0, express_async_handler_1.default)((request, response, next) => {
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All course enums are retrieved successfully', [client_1.$Enums.Language, client_1.$Enums.CourseLevel]));
        });
        this.courseAggregates = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { where, skip, take, orderBy } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const aggregate = RequestManager_1.RequestManager.aggregateOptionsWrapper(request);
            const aggregateResult = await this.courseService.aggregate(Object.assign({ where,
                orderBy,
                skip,
                take }, aggregate));
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Course aggregate results are retrieved successfully', [aggregateResult]));
        });
        this.getAllCourses = (0, express_async_handler_1.default)(async (request, response, next) => {
            const findOptions = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const promiseResult = await Promise.all([
                this.courseService.findMany(findOptions),
                this.courseService.count({ where: findOptions.where })
            ]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All courses are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
        });
        this.getCourseById = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const Course = await this.courseService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select,
                include
            });
            if (!Course) {
                throw new APIError_1.default('This course does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The course is retrieved successfully', [Course]));
        });
        this.createCourse = (0, express_async_handler_1.default)(async (request, response, next) => {
            var _a;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const createdCourse = await this.courseService.create({
                data: Object.assign(Object.assign({}, request.body.input), { hours: undefined, lectures: undefined, articles: undefined, quizzes: undefined, userId: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id }),
                select,
                include,
            });
            response.status(HTTPStatusCode_1.default.Created).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The course is created successfully', [createdCourse]));
        });
        this.updateCourse = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const updatedCourse = await this.courseService.update({
                data: Object.assign(Object.assign({}, request.body.input), { id: +request.params.id }),
                select,
                include
            });
            this.logService.log('UPDATE', 'COURSE', Object.assign(Object.assign({}, request.body.input), { id: +request.params.id }), request.user);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The course is updated successfully', [updatedCourse]));
        });
        this.deleteCourse = (0, express_async_handler_1.default)(async (request, response, next) => {
            const deletedCourse = await this.courseService.delete(+request.params.id);
            this.logService.log('DELETE', 'COURSE', deletedCourse, request.user);
            response.status(HTTPStatusCode_1.default.NoContent).json();
        });
    }
    ;
};
exports.CourseController = CourseController;
exports.CourseController = CourseController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICourseService')),
    __param(1, (0, inversify_1.inject)('ILogService'))
], CourseController);
//# sourceMappingURL=CourseController.js.map