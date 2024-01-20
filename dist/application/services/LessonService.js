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
exports.LessonService = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const slugify_1 = __importDefault(require("slugify"));
const Transaction_1 = require("../../infrastructure/services/Transaction");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let LessonService = class LessonService {
    constructor(lessonRepository, courseService) {
        this.lessonRepository = lessonRepository;
        this.courseService = courseService;
    }
    async updateCourseInfo(lessonId, operationType, transaction, lessonType, time) {
        const lesson = await this.lessonRepository.findUnique({
            where: {
                id: lessonId
            },
            select: {
                lessonType: true,
                time: true,
                section: {
                    select: {
                        course: {
                            select: {
                                id: true,
                                lectures: true,
                                articles: true,
                                quizzes: true,
                                hours: true,
                            }
                        }
                    }
                }
            }
        });
        if (!lesson) {
            throw new APIError_1.default('This lesson is not exit', HTTPStatusCode_1.default.BadRequest);
        }
        let { id, articles, lectures, quizzes, hours } = lesson.section.course;
        if (operationType === 'update' && lessonType && lessonType !== lesson.lessonType) {
            articles = lesson.lessonType === 'ARTICLE' ? articles - 1 : articles;
            lectures = lesson.lessonType === 'VIDEO' ? lectures - 1 : lectures;
            quizzes = lesson.lessonType === 'QUIZ' ? quizzes - 1 : quizzes;
            articles = lessonType === 'ARTICLE' ? articles + 1 : articles;
            lectures = lessonType === 'VIDEO' ? lectures + 1 : lectures;
            quizzes = lessonType === 'QUIZ' ? quizzes + 1 : quizzes;
            // time = lessonType && lessonType !== lesson.lessonType ? 0 : time;
        }
        if (operationType == 'delete') {
            articles = lesson.lessonType === 'ARTICLE' ? articles - 1 : articles;
            lectures = lesson.lessonType === 'VIDEO' ? lectures - 1 : lectures;
            quizzes = lesson.lessonType === 'QUIZ' ? quizzes - 1 : quizzes;
        }
        hours = time === undefined ? hours : hours + (time - lesson.time);
        await this.courseService.update({
            data: {
                id,
                articles,
                lectures,
                quizzes,
                hours
            },
            select: {
                id: true
            },
        }, transaction);
    }
    count(args) {
        return this.lessonRepository.count(args);
    }
    ;
    findMany(args) {
        return this.lessonRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.lessonRepository.findUnique(args);
    }
    ;
    async create(args, transaction) {
        const { title, order, attachment, isFree, sectionId } = args.data;
        const slug = (0, slugify_1.default)(args.data.title.toString(), { lower: true, trim: true });
        const isOrderIsFound = await this.lessonRepository.findFirst({
            where: {
                order,
                sectionId
            },
            select: {
                id: true
            }
        });
        if (isOrderIsFound) {
            throw new APIError_1.default("There is another lesson with the same order", HTTPStatusCode_1.default.BadRequest);
        }
        return this.lessonRepository.create({
            data: {
                title,
                slug,
                order,
                lessonType: client_1.LessonType.UNDEFINED,
                attachment,
                isFree,
                section: {
                    connect: {
                        id: sectionId
                    }
                }
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    async update(args, transaction) {
        const { id, title, attachment, isFree, lessonType, time } = args.data;
        const slug = title ? (0, slugify_1.default)(title.toString(), { lower: true, trim: true }) : undefined;
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            (lessonType || time) && await this.updateCourseInfo(id, 'update', prismaTransaction, lessonType, time);
            return await this.lessonRepository.update({
                where: {
                    id
                },
                data: {
                    title: title || undefined,
                    slug: slug || undefined,
                    attachment: attachment || undefined,
                    isFree: isFree || undefined,
                    lessonType: lessonType || undefined,
                    time,
                },
                select: args.select,
                include: args.include
            }, prismaTransaction);
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            await this.updateCourseInfo(id, 'delete', prismaTransaction, undefined, 0);
            return this.lessonRepository.delete(id, prismaTransaction);
        }, transaction);
    }
    ;
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ILessonRepository')),
    __param(1, (0, inversify_1.inject)('ICourseService'))
], LessonService);
//# sourceMappingURL=LessonService.js.map