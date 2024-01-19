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
exports.VideoService = void 0;
const inversify_1 = require("inversify");
const Transaction_1 = require("../../infrastructure/services/Transaction");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let VideoService = class VideoService {
    constructor(videoRepository, courseService, lessonService) {
        this.videoRepository = videoRepository;
        this.courseService = courseService;
        this.lessonService = lessonService;
    }
    async isLessonAvailable(lessonId) {
        try {
            const lesson = await this.lessonService.findUnique({
                where: {
                    id: lessonId
                },
                select: {
                    lessonType: true
                }
            });
            if (lesson && lesson.lessonType === 'UNDEFINED') {
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    ;
    async updateLessonInfo(lessonId, time, lessonType, transaction) {
        await this.lessonService.update({
            data: {
                id: lessonId,
                time,
                lessonType,
            },
            select: {
                id: true
            }
        }, transaction);
    }
    ;
    count(args) {
        return this.videoRepository.count(args);
    }
    ;
    findMany(args) {
        return this.videoRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.videoRepository.findUnique(args);
    }
    ;
    async create(args, transaction) {
        const { title, description, url, time, lessonId } = args.data;
        if (!await this.isLessonAvailable(lessonId)) {
            throw new APIError_1.default('This lesson is not available', HTTPStatusCode_1.default.BadRequest);
        }
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            await this.updateLessonInfo(lessonId, time, 'VIDEO', prismaTransaction);
            return await this.videoRepository.create({
                data: {
                    title,
                    description,
                    url,
                    time,
                    lesson: {
                        connect: {
                            id: lessonId
                        },
                    }
                },
                select: args.select,
                include: args.include
            }, prismaTransaction);
        }, transaction);
    }
    async update(args, transaction) {
        const { id, title, description, url, time } = args.data;
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            const updateVideo = await this.videoRepository.update({
                where: {
                    id
                },
                data: {
                    title: title || undefined,
                    description: description || undefined,
                    url: url || undefined,
                    time,
                },
                select: args.select ? Object.assign(Object.assign({}, args.select), { lessonId: true }) : undefined,
                include: args.include
            }, prismaTransaction);
            if (time) {
                await this.updateLessonInfo(updateVideo.lessonId, time, undefined, prismaTransaction);
            }
            args.select && !args.select.lessonId && Reflect.deleteProperty(updateVideo, 'lessonId');
            return updateVideo;
        }, transaction);
    }
    delete(id, transaction) {
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            const deletedVideo = await this.videoRepository.delete(id);
            await this.updateLessonInfo(deletedVideo.lessonId, 0, 'UNDEFINED', prismaTransaction);
            return deletedVideo;
        }, transaction);
    }
    ;
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IVideoRepository')),
    __param(1, (0, inversify_1.inject)('ICourseService')),
    __param(2, (0, inversify_1.inject)('ILessonService'))
], VideoService);
//# sourceMappingURL=VideoService.js.map