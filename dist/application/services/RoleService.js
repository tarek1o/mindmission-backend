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
exports.RoleService = void 0;
const inversify_1 = require("inversify");
const slugify_1 = __importDefault(require("slugify"));
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let RoleService = class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    count(args) {
        return this.roleRepository.count(args);
    }
    findMany(args) {
        return this.roleRepository.findMany(args);
    }
    findUnique(args) {
        return this.roleRepository.findUnique(args);
    }
    async create(args) {
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
        return this.roleRepository.create(args);
    }
    async update(args) {
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
        return this.roleRepository.update(args);
    }
    async delete(id) {
        const role = await this.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                slug: true
            }
        });
        if (!role) {
            throw new Error('This role is not exist');
        }
        if (role.slug === "student" || role.slug === "instructor" || role.slug === "super-admin") {
            throw new Error('This role is not deletable');
        }
        return this.roleRepository.delete(id);
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IRoleRepository'))
], RoleService);
//# sourceMappingURL=RoleService.js.map