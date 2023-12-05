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
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let ArticleService = class ArticleService {
    constructor(articleRepository, lessonService) {
        this.articleRepository = articleRepository;
        this.lessonService = lessonService;
    }
    async isLessonTypeIsArticle(lessonId) {
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
        if (lesson.lessonType !== client_1.LessonType.ARTICLE) {
            throw new APIError_1.default('The type of this lesson is not article', HTTPStatusCode_1.default.BadRequest);
        }
    }
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
        var _a, _b;
        await this.isLessonTypeIsArticle((_b = (_a = args.data.lesson) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.id);
        return this.articleRepository.create(args);
    }
    async update(args) {
        var _a, _b;
        if ((_b = (_a = args.data.lesson) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.id) {
            await this.isLessonTypeIsArticle(args.data.lesson.connect.id);
        }
        return this.articleRepository.update(args);
    }
    delete(id) {
        return this.articleRepository.delete(id);
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