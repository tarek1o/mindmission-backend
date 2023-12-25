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
exports.VideoController = void 0;
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const RequestManager_1 = require("../services/RequestManager");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let VideoController = class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
        this.getAllVideos = (0, express_async_handler_1.default)(async (request, response, next) => {
            const findOptions = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const promiseResult = await Promise.all([
                this.videoService.findMany(findOptions),
                this.videoService.count({ where: findOptions.where })
            ]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All Videos are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
        });
        this.getVideoById = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const video = await this.videoService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select,
                include
            });
            if (!video) {
                throw new APIError_1.default('This Video does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The Video is retrieved successfully', [video]));
        });
        this.createVideo = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const { title, description, url, lessonId } = request.body.input;
            const createdVideo = await this.videoService.create({
                data: {
                    title,
                    description,
                    url,
                    lesson: {
                        connect: {
                            id: lessonId
                        }
                    }
                },
                select,
                include,
            });
            response.status(HTTPStatusCode_1.default.Created).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The video is created successfully', [createdVideo]));
        });
        this.updateVideo = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const { title, description, url, lessonId } = request.body.input;
            const updatedVideo = await this.videoService.update({
                where: {
                    id: +request.params.id
                },
                data: {
                    title: title || undefined,
                    description: description || undefined,
                    url: url || undefined,
                    lesson: lessonId ? {
                        connect: {
                            id: lessonId
                        }
                    } : undefined
                },
                select,
                include,
            });
            response.status(HTTPStatusCode_1.default.Created).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The video is updated successfully', [updatedVideo]));
        });
        this.deleteVideo = (0, express_async_handler_1.default)(async (request, response, next) => {
            await this.videoService.delete(+request.params.id);
            response.status(HTTPStatusCode_1.default.NoContent).json();
        });
    }
};
exports.VideoController = VideoController;
exports.VideoController = VideoController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IVideoService'))
], VideoController);
//# sourceMappingURL=VideoController.js.map