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
exports.SectionService = void 0;
const inversify_1 = require("inversify");
const slugify_1 = __importDefault(require("slugify"));
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let SectionService = class SectionService {
    constructor(sectionRepository) {
        this.sectionRepository = sectionRepository;
    }
    count(args) {
        return this.sectionRepository.count(args);
    }
    ;
    findMany(args) {
        return this.sectionRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.sectionRepository.findUnique(args);
    }
    ;
    findFirst(args) {
        return this.sectionRepository.findFirst(args);
    }
    ;
    async create(args, transaction) {
        const { title, description, order, courseId } = args.data;
        const slug = (0, slugify_1.default)(title, { lower: true, trim: true });
        const isOrderExist = await this.findFirst({
            where: {
                courseId: courseId,
                order: order
            },
            select: {
                id: true
            }
        });
        if (isOrderExist) {
            throw new APIError_1.default('There is already section with the same order', HTTPStatusCode_1.default.BadRequest);
        }
        return this.sectionRepository.create({
            data: {
                title,
                slug,
                order,
                description,
                course: {
                    connect: {
                        id: courseId
                    }
                }
            },
            select: args === null || args === void 0 ? void 0 : args.select,
            include: args === null || args === void 0 ? void 0 : args.include
        }, transaction);
    }
    async update(args, transaction) {
        const { id, title, description, lessons } = args.data;
        const slug = title ? (0, slugify_1.default)(title.toString(), { lower: true, trim: true }) : undefined;
        return this.sectionRepository.update({
            where: {
                id: id
            },
            data: {
                title: title || undefined,
                slug: slug || undefined,
                description: description || undefined,
                lessons: lessons ? {
                    update: lessons.map(({ id, order }) => {
                        return {
                            where: {
                                id
                            },
                            data: {
                                order
                            }
                        };
                    })
                } : undefined
            },
            select: args === null || args === void 0 ? void 0 : args.select,
            include: args === null || args === void 0 ? void 0 : args.include
        }, transaction);
    }
    delete(id, transaction) {
        return this.sectionRepository.delete(id, transaction);
    }
    ;
};
exports.SectionService = SectionService;
exports.SectionService = SectionService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ISectionRepository'))
], SectionService);
//# sourceMappingURL=SectionService.js.map