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
    constructor(courseRepository, categoryService, chapterService) {
        this.courseRepository = courseRepository;
        this.categoryService = categoryService;
        this.chapterService = chapterService;
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
        if (!topic) {
            throw new APIError_1.default("This topic is not exist", HTTPStatusCode_1.default.BadRequest);
        }
        if (topic.type !== 'TOPIC') {
            throw new APIError_1.default(`Any course must belongs to topic not ${topic.type.toLowerCase()}`, HTTPStatusCode_1.default.BadRequest);
        }
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
    async create(args) {
        var _a, _b;
        args.data.slug = (0, slugify_1.default)(args.data.title, { lower: true, trim: true });
        await this.isTrueTopic((_b = (_a = args.data.topic) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.id);
        return this.courseRepository.create(args);
    }
    ;
    async update(args) {
        var _a, _b;
        if (args.data.title) {
            args.data.slug = (0, slugify_1.default)(args.data.title.toString(), { lower: true, trim: true });
        }
        if ((_b = (_a = args.data.topic) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.id) {
            await this.isTrueTopic(args.data.topic.connect.id);
        }
        if (args.data.chapters) {
            const count = await this.chapterService.count({
                where: {
                    courseId: args.where.id
                },
            });
            if (count !== args.data.chapters.update.length) {
                throw new APIError_1.default("You should send all course's chapters during update the order of chapters", HTTPStatusCode_1.default.BadRequest);
            }
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
    __param(0, (0, inversify_1.inject)('ICourseRepository')),
    __param(1, (0, inversify_1.inject)('ICategoryService')),
    __param(2, (0, inversify_1.inject)('IChapterService'))
], CourseService);
//# sourceMappingURL=CourseService.js.map