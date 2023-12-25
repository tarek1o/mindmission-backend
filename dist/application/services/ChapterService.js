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
exports.ChapterService = void 0;
const inversify_1 = require("inversify");
const slugify_1 = __importDefault(require("slugify"));
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let ChapterService = class ChapterService {
    constructor(chapterRepository, lessonService) {
        this.chapterRepository = chapterRepository;
        this.lessonService = lessonService;
    }
    count(args) {
        return this.chapterRepository.count(args);
    }
    ;
    findMany(args) {
        return this.chapterRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.chapterRepository.findUnique(args);
    }
    ;
    findFirst(args) {
        return this.chapterRepository.findFirst(args);
    }
    ;
    async create(args) {
        const { courseId, order, title, description } = args.data;
        const isOrderExist = await this.findFirst({
            where: {
                courseId: courseId,
                order: order
            },
            select: {
                id: true
            }
        });
        if (isOrderExist) {
            throw new APIError_1.default('There is already chapter with the same order', HTTPStatusCode_1.default.BadRequest);
        }
        return this.chapterRepository.create({
            data: {
                title: title,
                order: order,
                description: description,
                course: {
                    connect: {
                        id: courseId
                    }
                }
            },
            select: args === null || args === void 0 ? void 0 : args.select,
            include: args === null || args === void 0 ? void 0 : args.include
        });
    }
    async update(args) {
        const { id, title, description, lessons } = args.data;
        const slug = title ? (0, slugify_1.default)(title.toString(), { lower: true, trim: true }) : undefined;
        if (lessons) {
            const count = await this.lessonService.count({
                where: {
                    chapterId: id
                },
            });
            if (count !== lessons.length) {
                throw new APIError_1.default("You should send all chapter's lessons during update the order of lessons", HTTPStatusCode_1.default.BadRequest);
            }
        }
        ;
        return this.chapterRepository.update({
            where: {
                id: id
            },
            data: {
                title: title || undefined,
                slug: slug || undefined,
                description: description || undefined,
                lessons: lessons ? {
                    update: lessons.map(({ id, order }) => {
                        return {
                            where: {
                                id
                            },
                            data: {
                                order
                            }
                        };
                    })
                } : undefined
            },
            select: args === null || args === void 0 ? void 0 : args.select,
            include: args === null || args === void 0 ? void 0 : args.include
        });
    }
    delete(id) {
        return this.chapterRepository.delete(id);
    }
    ;
};
exports.ChapterService = ChapterService;
exports.ChapterService = ChapterService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IChapterRepository')),
    __param(1, (0, inversify_1.inject)('ILessonService'))
], ChapterService);
//# sourceMappingURL=ChapterService.js.map