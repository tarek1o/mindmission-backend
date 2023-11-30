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
exports.CourseService = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const slugify_1 = __importDefault(require("slugify"));
let CourseService = class CourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    createQuestions(questions) {
        return questions.map((question) => {
            return {
                questionText: question.questionText,
                choiceA: question.choiceA,
                choiceB: question.choiceB,
                choiceC: question.choiceC,
                choiceD: question.choiceD,
                correctAnswer: question.correctAnswer
            };
        });
    }
    ;
    createQuiz(quiz) {
        return {
            questions: {
                create: this.createQuestions(quiz.questions)
            }
        };
    }
    ;
    createArticle(article) {
        return {
            title: article.title,
            slug: (0, slugify_1.default)(article.title, { lower: true, trim: true }),
            content: article.content,
        };
    }
    ;
    createVideo(video) {
        return {
            title: video.title,
            slug: (0, slugify_1.default)(video.title, { lower: true, trim: true }),
            description: video.description,
            url: video.url,
        };
    }
    ;
    createLessons(lessons) {
        return lessons.map((lesson) => {
            return {
                title: lesson.title,
                slug: (0, slugify_1.default)(lesson.title, { lower: true, trim: true }),
                isFree: lesson.isFree,
                lessonType: lesson.lessonType,
                video: lesson.lessonType === client_1.LessonType.VIDEO ? {
                    create: this.createVideo(lesson.video)
                } : undefined,
                article: lesson.lessonType === client_1.LessonType.ARTICLE ? {
                    create: this.createArticle(lesson.article)
                } : undefined,
                quiz: lesson.lessonType === client_1.LessonType.Quiz ? {
                    create: this.createQuiz(lesson.quiz)
                } : undefined
            };
        });
    }
    ;
    createChapters(chapters) {
        return chapters.map((chapter) => {
            return {
                title: chapter.title,
                slug: (0, slugify_1.default)(chapter.title, { lower: true, trim: true }),
                lessons: {
                    create: this.createLessons(chapter.lessons)
                }
            };
        });
    }
    ;
    count(args) {
        return this.courseRepository.count(args);
    }
    ;
    findMany(args) {
        return this.courseRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.courseRepository.findUnique(args);
    }
    ;
    async create(args) {
        args.data.slug = (0, slugify_1.default)(args.data.title, { lower: true, trim: true });
        args.data.chapters = {
            create: this.createChapters(args.data.chapters)
        };
        return this.courseRepository.create(args);
    }
    ;
    async update(args) {
        if (args.data.title) {
            args.data.slug = (0, slugify_1.default)(args.data.title.toString(), { lower: true, trim: true });
        }
        return this.courseRepository.update(args);
    }
    ;
    delete(id) {
        return this.courseRepository.delete(id);
    }
    ;
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICourseRepository'))
], CourseService);
//# sourceMappingURL=CourseService.js.map