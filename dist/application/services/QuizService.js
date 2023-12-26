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
exports.QuizService = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let QuizService = class QuizService {
    constructor(quizRepository, lessonService) {
        this.quizRepository = quizRepository;
        this.lessonService = lessonService;
    }
    async isLessonTypeIsQuiz(lessonId) {
        const lesson = await this.lessonService.findUnique({
            where: {
                id: lessonId
            },
            select: {
                lessonType: true
            }
        });
        if (lesson && lesson.lessonType === client_1.LessonType.QUIZ) {
            return true;
        }
        return false;
    }
    count(args) {
        return this.quizRepository.count(args);
    }
    ;
    findMany(args) {
        return this.quizRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.quizRepository.findUnique(args);
    }
    ;
    async create(args) {
        const { title, description, requiredTime, questions, lessonId } = args.data;
        if (await this.isLessonTypeIsQuiz(lessonId)) {
            throw new APIError_1.default("This lesson may be not exist or may be exist but its type is not a quiz", HTTPStatusCode_1.default.BadRequest);
        }
        return this.quizRepository.create({
            data: {
                title,
                requiredTime,
                description,
                questions: {
                    createMany: {
                        data: questions.map((question, index) => {
                            return {
                                questionText: question.questionText,
                                choiceA: question.choiceA,
                                choiceB: question.choiceB,
                                choiceC: question.choiceC,
                                choiceD: question.choiceD,
                                correctAnswer: question.correctAnswer,
                                order: question.order || index + 1,
                                level: question.level
                            };
                        })
                    }
                },
                lesson: {
                    connect: {
                        id: lessonId
                    }
                }
            },
            select: args.select,
            include: args.include
        });
    }
    ;
    async update(args) {
        const { id, title, description, requiredTime, questions, lessonId } = args.data;
        if (lessonId && !await this.isLessonTypeIsQuiz(lessonId)) {
            throw new APIError_1.default("This lesson may be not exist or may be exist but its type is not a quiz", HTTPStatusCode_1.default.BadRequest);
        }
        return this.quizRepository.update({
            where: {
                id,
            },
            data: {
                title: title || undefined,
                requiredTime: requiredTime || undefined,
                description: description || undefined,
                questions: questions && questions.length > 0 ? {
                    upsert: questions.map((question, index) => {
                        return {
                            where: {
                                id: question.id || 0
                            },
                            update: {
                                questionText: question.questionText || undefined,
                                choiceA: question.choiceA || undefined,
                                choiceB: question.choiceB || undefined,
                                choiceC: question.choiceC || undefined,
                                choiceD: question.choiceD || undefined,
                                correctAnswer: question.correctAnswer || undefined,
                                order: question.order || undefined,
                                level: question.level || undefined,
                            },
                            create: {
                                questionText: question.questionText,
                                choiceA: question.choiceA,
                                choiceB: question.choiceB,
                                choiceC: question.choiceC,
                                choiceD: question.choiceD,
                                correctAnswer: question.correctAnswer,
                                order: question.order || index + 1,
                                level: question.level
                            }
                        };
                    })
                } : undefined,
                lesson: lessonId ? {
                    connect: {
                        id: lessonId
                    }
                } : undefined
            },
            select: args.select,
            include: args.include
        });
    }
    ;
    delete(id) {
        return this.quizRepository.delete(id);
    }
    ;
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IQuizRepository')),
    __param(1, (0, inversify_1.inject)('ILessonService'))
], QuizService);
//# sourceMappingURL=QuizService.js.map