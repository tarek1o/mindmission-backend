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
const inversify_1 = require("inversify");
const Transaction_1 = require("../../infrastructure/services/Transaction");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let QuizService = class QuizService {
    constructor(quizRepository, lessonService) {
        this.quizRepository = quizRepository;
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
    async create(args, transaction) {
        const { title, description, time, questions, lessonId } = args.data;
        if (!await this.isLessonAvailable(lessonId)) {
            throw new APIError_1.default('This lesson is not available', HTTPStatusCode_1.default.BadRequest);
        }
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            await this.updateLessonInfo(lessonId, time, 'QUIZ', prismaTransaction);
            return await this.quizRepository.create({
                data: {
                    title,
                    time,
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
            }, prismaTransaction);
        }, transaction);
    }
    ;
    async update(args, transaction) {
        const { id, title, description, time, questions } = args.data;
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            const updatedQuiz = await this.quizRepository.update({
                where: {
                    id,
                },
                data: {
                    title: title || undefined,
                    time: time || undefined,
                    description: description || undefined,
                    questions: questions && questions.length > 0 ? {
                        upsert: questions.map((question, index) => {
                            return {
                                where: {
                                    quizId_order: {
                                        quizId: id,
                                        order: question.order || 0
                                    }
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
                },
                select: args.select ? Object.assign(Object.assign({}, args.select), { lessonId: true }) : undefined,
                include: args.include
            }, prismaTransaction);
            if (time) {
                await this.updateLessonInfo(updatedQuiz.lessonId, time, undefined, prismaTransaction);
            }
            args.select && !args.select.lessonId && Reflect.deleteProperty(updatedQuiz, 'lessonId');
            return updatedQuiz;
        }, transaction);
    }
    ;
    async delete(id, transaction) {
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            const deletedQuiz = await this.quizRepository.delete(id, prismaTransaction);
            await this.updateLessonInfo(deletedQuiz.lessonId, 0, 'UNDEFINED', prismaTransaction);
            return deletedQuiz;
        }, transaction);
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