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
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const Transaction_1 = require("../../infrastructure/services/Transaction");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let VideoService = class VideoService {
    constructor(videoRepository, lessonService, courseService) {
        this.videoRepository = videoRepository;
        this.lessonService = lessonService;
        this.courseService = courseService;
    }
    async isLessonTypeIsVideo(lessonId) {
        const lesson = await this.lessonService.findUnique({
            where: {
                id: lessonId
            },
            select: {
                lessonType: true
            }
        });
        if (lesson && lesson.lessonType === client_1.LessonType.VIDEO) {
            return true;
        }
        return false;
    }
    async updateCourseInfo(videoId, operationType, time) {
        const video = await this.findUnique({
            where: {
                id: videoId
            },
            select: {
                time: true,
                lesson: {
                    select: {
                        chapter: {
                            select: {
                                course: {
                                    select: {
                                        id: true,
                                        hours: true,
                                        lectures: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!video) {
            throw new APIError_1.default("This video is not exist", HTTPStatusCode_1.default.BadRequest);
        }
        let { id, hours, lectures } = video.lesson.chapter.course;
        if (time && operationType === 'update') {
            time -= video.time;
        }
        if (operationType === 'delete') {
            time = -video.time;
        }
        await this.courseService.update({
            data: {
                id,
                hours: hours + time,
                lectures: operationType === "create" ? lectures + 1 : (operationType === "delete" ? lectures - 1 : undefined)
            }
        });
    }
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
    async create(args) {
        const { title, description, url, time, lessonId } = args.data;
        if (!await this.isLessonTypeIsVideo(lessonId)) {
            throw new APIError_1.default("This lesson may be not exist or may be exist but its type is not a video", HTTPStatusCode_1.default.BadRequest);
        }
        return Transaction_1.Transaction.transact(async () => {
            const createdVideo = await this.videoRepository.create({
                data: {
                    title,
                    description,
                    url,
                    time,
                    lesson: {
                        connect: {
                            id: lessonId
                        }
                    }
                },
                select: args.select,
                include: args.include
            });
            await this.updateCourseInfo(createdVideo.id, 'create', time);
            return createdVideo;
        });
    }
    async update(args) {
        const { id, title, description, url, time, lessonId } = args.data;
        if (lessonId && !await this.isLessonTypeIsVideo(lessonId)) {
            throw new APIError_1.default("This lesson may be not exist or may be exist but its type is not a video", HTTPStatusCode_1.default.BadRequest);
        }
        return Transaction_1.Transaction.transact(async () => {
            if (time) {
                await this.updateCourseInfo(id, 'update', time);
            }
            return this.videoRepository.update({
                where: {
                    id
                },
                data: {
                    title: title || undefined,
                    description: description || undefined,
                    url: url || undefined,
                    lesson: lessonId ? {
                        connect: {
                            id: lessonId
                        }
                    } : undefined,
                },
                select: args.select,
                include: args.include
            });
        });
    }
    async delete(id) {
        return Transaction_1.Transaction.transact(async () => {
            await this.updateCourseInfo(id, 'delete');
            return this.videoRepository.delete(id);
        });
    }
    ;
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IVideoRepository')),
    __param(1, (0, inversify_1.inject)('ILessonService')),
    __param(2, (0, inversify_1.inject)("ICourseService"))
], VideoService);
//# sourceMappingURL=VideoService.js.map