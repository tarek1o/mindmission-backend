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
exports.QuizController = void 0;
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const RequestManager_1 = require("../services/RequestManager");
let QuizController = class QuizController {
    constructor(quizService) {
        this.quizService = quizService;
        this.getAllQuizzes = (0, express_async_handler_1.default)(async (request, response, next) => {
            const findOptions = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const promiseResult = await Promise.all([
                this.quizService.findMany(findOptions),
                this.quizService.count({ where: findOptions.where })
            ]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All quizzes are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
        });
        this.getQuizById = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const quiz = await this.quizService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select,
                include
            });
            if (!quiz) {
                throw new APIError_1.default('This quiz does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The quiz is retrieved successfully', [quiz]));
        });
        this.createQuiz = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const { title, requiredTime, description, questions, lessonId } = request.body.input;
            const createdQuiz = await this.quizService.create({
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
                select,
                include,
            });
            response.status(HTTPStatusCode_1.default.Created).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The quiz is created successfully', [createdQuiz]));
        });
        this.updateQuiz = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const { title, requiredTime, description, questions, lessonId } = request.body.input;
            const updatedQuiz = await this.quizService.update({
                where: {
                    id: +request.params.id,
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
                select,
                include,
            });
            response.status(HTTPStatusCode_1.default.Created).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The quiz is updated successfully', [updatedQuiz]));
        });
        this.deleteQuiz = (0, express_async_handler_1.default)(async (request, response, next) => {
            await this.quizService.delete(+request.params.id);
            response.status(HTTPStatusCode_1.default.NoContent).json();
        });
    }
};
exports.QuizController = QuizController;
exports.QuizController = QuizController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IQuizService'))
], QuizController);
//# sourceMappingURL=QuizController.js.map