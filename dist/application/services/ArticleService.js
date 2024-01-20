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
const inversify_1 = require("inversify");
const Transaction_1 = require("../../infrastructure/services/Transaction");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let ArticleService = class ArticleService {
    constructor(articleRepository, lessonService) {
        this.articleRepository = articleRepository;
        this.lessonService = lessonService;
    }
    async isLessonAvailable(lessonId) {
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
    async create(args, transaction) {
        const { lessonId, title, content, time } = args.data;
        if (!await this.isLessonAvailable(lessonId)) {
            throw new APIError_1.default('This lesson is not available', HTTPStatusCode_1.default.BadRequest);
        }
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            await this.updateLessonInfo(lessonId, time, 'ARTICLE', prismaTransaction);
            return await this.articleRepository.create({
                data: {
                    title,
                    content,
                    time,
                    lesson: {
                        connect: {
                            id: lessonId
                        }
                    }
                },
                select: args.select,
                include: args.include
            }, prismaTransaction);
        }, transaction);
    }
    ;
    async update(args, transaction) {
        const { id, title, content, time } = args.data;
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            const updatedArticle = await this.articleRepository.update({
                where: {
                    id: id
                },
                data: {
                    title: title || undefined,
                    content: content || undefined,
                    time: time || undefined,
                },
                select: args.select,
                include: args.include
            }, prismaTransaction);
            if (time) {
                await this.updateLessonInfo(updatedArticle.lessonId, time, undefined, prismaTransaction);
            }
            args.select && !args.select.lessonId && Reflect.deleteProperty(updatedArticle, 'lessonId');
            return updatedArticle;
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            const deletedArticle = await this.articleRepository.delete(id, prismaTransaction);
            await this.updateLessonInfo(deletedArticle.lessonId, 0, 'UNDEFINED', prismaTransaction);
            return deletedArticle;
        }, transaction);
    }
    ;
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IArticleRepository')),
    __param(1, (0, inversify_1.inject)('ILessonService'))
], ArticleService);
//# sourceMappingURL=ArticleService.js.map