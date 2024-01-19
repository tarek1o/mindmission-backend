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
const inversify_1 = require("inversify");
const slugify_1 = __importDefault(require("slugify"));
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let CourseService = class CourseService {
    constructor(courseRepository, categoryService) {
        this.courseRepository = courseRepository;
        this.categoryService = categoryService;
    }
    async isTrueTopic(id) {
        const topic = await this.categoryService.findUnique({
            where: {
                id
            },
            select: {
                type: true
            }
        });
        if (topic && topic.type === 'TOPIC') {
            return true;
        }
        return false;
    }
    aggregate(args) {
        return this.courseRepository.aggregate(args);
    }
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
    async create(args, transaction) {
        const { title, shortDescription, description, language, level, imageCover, requirements, courseTeachings, price, isDraft, userId, topicId } = args.data;
        const slug = (0, slugify_1.default)(title, { lower: true, trim: true });
        if (!await this.isTrueTopic(topicId)) {
            throw new APIError_1.default("This topic may be not exist or may be exist but not a topic", HTTPStatusCode_1.default.BadRequest);
        }
        return this.courseRepository.create({
            data: {
                title,
                slug,
                shortDescription,
                description,
                language,
                level,
                imageCover,
                requirements,
                courseTeachings,
                price,
                isDraft,
                instructor: {
                    connect: {
                        userId
                    }
                },
                topic: {
                    connect: {
                        id: topicId
                    }
                }
            },
            select: args.select,
            included: args.include
        }, transaction);
    }
    ;
    async update(args, transaction) {
        let { id, title, shortDescription, description, language, level, imageCover, requirements, courseTeachings, price, discountPercentage, hours, lectures, articles, quizzes, isApproved, isDraft, sections: sections, topicId } = args.data;
        const slug = title ? (0, slugify_1.default)(title.toString(), { lower: true, trim: true }) : undefined;
        if (topicId && !await this.isTrueTopic(topicId)) {
            throw new APIError_1.default("This topic may be not exist or may be exist but not a topic", HTTPStatusCode_1.default.BadRequest);
        }
        return this.courseRepository.update({
            where: {
                id
            },
            data: {
                title: title || undefined,
                slug,
                shortDescription: shortDescription || undefined,
                description: description || undefined,
                language: language || undefined,
                level: level || undefined,
                imageCover: imageCover || undefined,
                requirements: requirements || undefined,
                courseTeachings: courseTeachings || undefined,
                price: price || undefined,
                discountPercentage: discountPercentage || undefined,
                hours,
                lectures,
                articles,
                quizzes,
                isApproved: isApproved,
                isDraft: isDraft,
                publishedAt: isApproved ? new Date() : undefined,
                sections: sections ? {
                    update: sections.map(({ id, order }) => {
                        return {
                            where: {
                                id
                            },
                            data: {
                                order
                            }
                        };
                    })
                } : undefined,
                topic: topicId ? {
                    connect: {
                        id: topicId
                    }
                } : undefined,
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return this.courseRepository.delete(id, transaction);
    }
    ;
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICourseRepository')),
    __param(1, (0, inversify_1.inject)('ICategoryService'))
], CourseService);
//# sourceMappingURL=CourseService.js.map