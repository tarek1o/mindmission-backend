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
exports.ArticleService = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const Transaction_1 = require("../../infrastructure/Services/Transaction");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let ArticleService = class ArticleService {
    constructor(articleRepository, lessonService, courseService) {
        this.articleRepository = articleRepository;
        this.lessonService = lessonService;
        this.courseService = courseService;
    }
    async isLessonTypeIsArticle(lessonId) {
        const lesson = await this.lessonService.findUnique({
            where: {
                id: lessonId
            },
            select: {
                lessonType: true,
                chapter: {
                    select: {
                        courseId: true
                    }
                }
            }
        });
        if (lesson && lesson.lessonType === client_1.LessonType.ARTICLE) {
            return true;
        }
        return false;
    }
    ;
    async updateCourseInfo(articleId, operationType, readingTime) {
        const article = await this.findUnique({
            where: {
                id: articleId
            },
            select: {
                readingTime: true,
                lesson: {
                    select: {
                        chapter: {
                            select: {
                                course: {
                                    select: {
                                        id: true,
                                        hours: true,
                                        articles: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!article) {
            throw new APIError_1.default("This article is not exist", HTTPStatusCode_1.default.BadRequest);
        }
        let { id, hours, articles } = article.lesson.chapter.course;
        if (readingTime && operationType === 'update') {
            readingTime -= article.readingTime;
        }
        if (operationType === 'delete') {
            readingTime = -article.readingTime;
        }
        await this.courseService.update({
            data: {
                id,
                hours: hours + readingTime,
                articles: operationType === "create" ? articles + 1 : (operationType === "delete" ? articles - 1 : undefined)
            }
        });
    }
    ;
    count(args) {
        return this.articleRepository.count(args);
    }
    ;
    findMany(args) {
        return this.articleRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.articleRepository.findUnique(args);
    }
    ;
    async create(args) {
        const { lessonId, title, content, readingTime } = args.data;
        if (!await this.isLessonTypeIsArticle(lessonId)) {
            throw new APIError_1.default("This lesson may be not exist or may be exist but its type is not an article", HTTPStatusCode_1.default.BadRequest);
        }
        return Transaction_1.Transaction.transact(async () => {
            const createdArticle = await this.articleRepository.create({
                data: {
                    title,
                    content,
                    readingTime,
                    lesson: {
                        connect: {
                            id: lessonId
                        }
                    }
                },
                select: args.select,
                include: args.include
            });
            await this.updateCourseInfo(createdArticle.id, 'create', readingTime);
            return createdArticle;
        });
    }
    async update(args) {
        const { id, title, content, readingTime, lessonId } = args.data;
        if (lessonId && !await this.isLessonTypeIsArticle(lessonId)) {
            throw new APIError_1.default("This lesson may be not exist or may be exist but its type is not an article", HTTPStatusCode_1.default.BadRequest);
        }
        return Transaction_1.Transaction.transact(async () => {
            if (readingTime) {
                await this.updateCourseInfo(id, 'update', readingTime);
            }
            return this.articleRepository.update({
                where: {
                    id: id
                },
                data: {
                    title: title || undefined,
                    content: content || undefined,
                    readingTime: readingTime || undefined,
                    lesson: lessonId ? {
                        connect: {
                            id: lessonId
                        }
                    } : undefined
                },
                select: args.select,
                include: args.include
            });
        });
    }
    async delete(id) {
        return Transaction_1.Transaction.transact(async () => {
            await this.updateCourseInfo(id, 'delete');
            return this.articleRepository.delete(id);
        });
    }
    ;
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IArticleRepository')),
    __param(1, (0, inversify_1.inject)('ILessonService')),
    __param(2, (0, inversify_1.inject)('ICourseService'))
], ArticleService);
//# sourceMappingURL=ArticleService.js.map