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
const inversify_1 = require("inversify");
const slugify_1 = __importDefault(require("slugify"));
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let LessonService = class LessonService {
    constructor(lessonRepository) {
        this.lessonRepository = lessonRepository;
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
    async create(args) {
        args.data.slug = (0, slugify_1.default)(args.data.title.toString(), { lower: true, trim: true });
        const isOrderIsFound = await this.lessonRepository.findFirst({
            where: {
                order: args.data.order,
                chapterId: args.data.chapterId
            },
            select: {
                id: true
            }
        });
        if (isOrderIsFound) {
            throw new APIError_1.default("There is another lesson with the same order ", HTTPStatusCode_1.default.BadRequest);
        }
        return this.lessonRepository.create(args);
    }
    async update(args) {
        if (args.data.title) {
            args.data.slug = (0, slugify_1.default)(args.data.title.toString(), { lower: true, trim: true });
        }
        return this.lessonRepository.update(args);
    }
    delete(id) {
        return this.lessonRepository.delete(id);
    }
    ;
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ILessonRepository'))
], LessonService);
//# sourceMappingURL=LessonService.js.map