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
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let VideoService = class VideoService {
    constructor(videoRepository, lessonService) {
        this.videoRepository = videoRepository;
        this.lessonService = lessonService;
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
        if (!lesson) {
            throw new APIError_1.default('This lesson is not exist', HTTPStatusCode_1.default.BadRequest);
        }
        if (lesson.lessonType !== client_1.LessonType.VIDEO) {
            throw new APIError_1.default('The type of this lesson is not video', HTTPStatusCode_1.default.BadRequest);
        }
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
        var _a, _b;
        await this.isLessonTypeIsVideo((_b = (_a = args.data.lesson) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.id);
        return this.videoRepository.create(args);
    }
    async update(args) {
        var _a, _b;
        if ((_b = (_a = args.data.lesson) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.id) {
            await this.isLessonTypeIsVideo(args.data.lesson.connect.id);
        }
        return this.videoRepository.update(args);
    }
    delete(id) {
        return this.videoRepository.delete(id);
    }
    ;
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IVideoRepository')),
    __param(1, (0, inversify_1.inject)('ILessonService'))
], VideoService);
//# sourceMappingURL=VideoService.js.map