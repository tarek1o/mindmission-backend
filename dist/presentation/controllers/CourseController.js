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
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const RequestManager_1 = require("../services/RequestManager");
let CourseController = class CourseController {
    constructor(courseService, logService) {
        this.courseService = courseService;
        this.logService = logService;
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
                throw new APIError_1.default('This Course does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The Course is retrieved successfully', [Course]));
        });
        this.createCourse = (0, express_async_handler_1.default)(async (request, response, next) => {
            var _a;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const { title, shortDescription, description, language, level, imageCover, requirements, courseTeachings, price, discountPercentage, topicId, chapters } = request.body.input;
            const createdCourse = await this.courseService.create({
                data: {
                    title,
                    slug: title,
                    shortDescription,
                    description,
                    language,
                    level,
                    imageCover,
                    requirements,
                    courseTeachings,
                    price,
                    discountPercentage,
                    isApproved: false,
                    chapters,
                    topic: {
                        connect: {
                            id: topicId
                        }
                    },
                    instructor: {
                        connect: {
                            id: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id
                        }
                    }
                },
                select,
                include,
            });
            response.status(HTTPStatusCode_1.default.Created).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The Course is created successfully', [createdCourse]));
        });
        this.updateCourse = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const { title, shortDescription, description, language, level, imageCover, requirements, courseTeachings, price, discountPercentage, isApproved, topicId } = request.body.input;
            const updatedCourse = await this.courseService.update({
                where: {
                    id: +request.params.id
                },
                data: {
                    title: title || undefined,
                    slug: title || undefined,
                    shortDescription: shortDescription || undefined,
                    description: description || undefined,
                    language: language || undefined,
                    level: level || undefined,
                    imageCover: imageCover || undefined,
                    requirements: requirements || undefined,
                    courseTeachings: courseTeachings || undefined,
                    price: price || undefined,
                    discountPercentage: discountPercentage || undefined,
                    isApproved: isApproved || undefined,
                    topic: topicId ? {
                        connect: {
                            id: topicId
                        }
                    } : undefined,
                },
                select,
                include
            });
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The Course is updated successfully', [updatedCourse]));
        });
        this.deleteCourse = (0, express_async_handler_1.default)(async (request, response, next) => {
            const deletedCourse = await this.courseService.delete(+request.params.id);
            response.status(HTTPStatusCode_1.default.NoContent).json();
        });
    }
};
exports.CourseController = CourseController;
exports.CourseController = CourseController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICourseService')),
    __param(1, (0, inversify_1.inject)('ILogService'))
], CourseController);
//# sourceMappingURL=CourseController.js.map