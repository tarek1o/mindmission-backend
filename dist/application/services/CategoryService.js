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
exports.CategoryService = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const slugify_1 = __importDefault(require("slugify"));
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
        this.parentChild = {
            [client_1.CategoryType.CATEGORY]: undefined,
            [client_1.CategoryType.SUBCATEGORY]: client_1.CategoryType.CATEGORY,
            [client_1.CategoryType.TOPIC]: client_1.CategoryType.SUBCATEGORY
        };
    }
    async isCorrectParent(type, parentId) {
        const parentType = this.parentChild[type];
        if (!parentId && !parentType) {
            return true;
        }
        else if (parentId && parentType) {
            const parent = await this.categoryRepository.findUnique({
                where: {
                    id: parentId,
                },
                select: {
                    type: true
                }
            });
            if (parent && parent.type === parentType) {
                return true;
            }
            ;
        }
        return false;
    }
    count(args) {
        return this.categoryRepository.count(args);
    }
    ;
    findMany(args) {
        return this.categoryRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.categoryRepository.findUnique(args);
    }
    ;
    async create(args) {
        var _a, _b, _c;
        const { type } = args.data;
        args.data.slug = (0, slugify_1.default)(args.data.name, { trim: true, lower: true });
        const isExist = await this.findUnique({
            where: {
                slug: args.data.slug
            },
            select: {
                id: true
            }
        });
        if (isExist) {
            throw new APIError_1.default('This name already exists', HTTPStatusCode_1.default.BadRequest);
        }
        if (!await this.isCorrectParent(type, (_b = (_a = args.data.parent) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.id)) {
            const errorMessage = this.parentChild[type] ? `The ${type.toLowerCase()} must belong to a ${(_c = this.parentChild[type]) === null || _c === void 0 ? void 0 : _c.toLowerCase()}` : 'The category has no parent';
            throw new APIError_1.default(errorMessage, HTTPStatusCode_1.default.BadRequest);
        }
        return this.categoryRepository.create(args);
    }
    ;
    async update(args) {
        var _a, _b, _c, _d, _e;
        if (args.data.name) {
            args.data.slug = (0, slugify_1.default)(args.data.name.toString(), { trim: true, lower: true });
            const isExist = await this.findUnique({
                where: {
                    slug: args.data.slug
                },
                select: {
                    id: true
                }
            });
            if (isExist && isExist.id !== args.where.id) {
                throw new APIError_1.default('This name already exists', HTTPStatusCode_1.default.BadRequest);
            }
        }
        if (args.data.type || ((_b = (_a = args.data.parent) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.id)) {
            const category = await this.categoryRepository.findUnique({
                where: args.where,
                select: {
                    type: true,
                    parentId: true,
                }
            });
            const type = (args.data.type || (category === null || category === void 0 ? void 0 : category.type));
            const parentId = (((_d = (_c = args.data.parent) === null || _c === void 0 ? void 0 : _c.connect) === null || _d === void 0 ? void 0 : _d.id) || (category === null || category === void 0 ? void 0 : category.parentId));
            if (!await this.isCorrectParent(type, parentId)) {
                const errorMessage = this.parentChild[type] ? `The ${type.toLowerCase()} must belong to a ${(_e = this.parentChild[type]) === null || _e === void 0 ? void 0 : _e.toLowerCase()}` : 'The category has no parent';
                throw new APIError_1.default(errorMessage, HTTPStatusCode_1.default.BadRequest);
            }
        }
        return this.categoryRepository.update(args);
    }
    delete(id) {
        return this.categoryRepository.delete(id);
    }
    ;
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICategoryRepository'))
], CategoryService);
//# sourceMappingURL=CategoryService.js.map