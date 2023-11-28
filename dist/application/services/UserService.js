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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const inversify_1 = require("inversify");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let UserService = class UserService {
    constructor(userRepository, roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    count(args) {
        return this.userRepository.count(args);
    }
    findMany(args) {
        return this.userRepository.findMany(args);
    }
    findUnique(args) {
        return this.userRepository.findUnique(args);
    }
    findFirst(args) {
        return this.userRepository.findFirst(args);
    }
    async create(args) {
        var _a, _b, _c, _d, _e, _f, _g;
        args.data.password = bcrypt_1.default.hashSync(args.data.password, 10);
        const isEmailExist = await this.findFirst({
            where: {
                email: {
                    equals: args.data.email,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true
            }
        });
        if (isEmailExist) {
            throw new APIError_1.default('This email already exists', HTTPStatusCode_1.default.BadRequest);
        }
        ;
        if ((_b = (_a = args.data.role) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.id) {
            const isRoleExist = await this.roleService.findUnique({
                where: {
                    id: (_d = (_c = args.data.role) === null || _c === void 0 ? void 0 : _c.connect) === null || _d === void 0 ? void 0 : _d.id
                },
                select: {
                    id: true,
                    slug: true
                }
            });
            if (!isRoleExist) {
                throw new APIError_1.default('This role does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            if (isRoleExist.slug === 'student') {
                args.data.student = {
                    create: (_e = args.data.student) === null || _e === void 0 ? void 0 : _e.create
                };
            }
            else if (isRoleExist.slug === 'instructor') {
                args.data.instructor = {
                    create: (_f = args.data.instructor) === null || _f === void 0 ? void 0 : _f.create
                };
            }
            else {
                args.data.admin = {
                    create: (_g = args.data.admin) === null || _g === void 0 ? void 0 : _g.create
                };
            }
        }
        return this.userRepository.create(args);
    }
    async update(args) {
        var _a, _b, _c, _d, _e, _f;
        if (args.data.password) {
            args.data.password = bcrypt_1.default.hashSync(args.data.password.toString(), 10);
        }
        if (args.data.resetPasswordCode && args.data.resetPasswordCode.code && !args.data.resetPasswordCode.isVerified) {
            args.data.resetPasswordCode.code = bcrypt_1.default.hashSync(args.data.resetPasswordCode.code.toString(), 10);
        }
        if (args.data.email) {
            const isEmailExist = await this.findFirst({
                where: {
                    email: {
                        equals: args.data.email.toString(),
                        mode: 'insensitive'
                    }
                },
                select: {
                    id: true
                }
            });
            if (isEmailExist && isEmailExist.id !== args.where.id) {
                throw new APIError_1.default('This email already exists', HTTPStatusCode_1.default.BadRequest);
            }
        }
        if (args.data.personalLinks) {
            const currentUser = await this.findUnique({
                where: args.where,
                select: {
                    role: {
                        select: {
                            slug: true
                        }
                    }
                }
            });
            if (currentUser && ((_a = currentUser.role) === null || _a === void 0 ? void 0 : _a.slug) !== 'student' && ((_b = currentUser.role) === null || _b === void 0 ? void 0 : _b.slug) !== 'instructor') {
                throw new APIError_1.default('Only students and instructors that can have personal links', HTTPStatusCode_1.default.BadRequest);
            }
        }
        if ((_d = (_c = args.data.role) === null || _c === void 0 ? void 0 : _c.connect) === null || _d === void 0 ? void 0 : _d.id) {
            const isRoleExist = await this.roleService.findUnique({
                where: {
                    id: (_f = (_e = args.data.role) === null || _e === void 0 ? void 0 : _e.connect) === null || _f === void 0 ? void 0 : _f.id
                },
                select: {
                    id: true,
                    slug: true
                }
            });
            if (!isRoleExist) {
                throw new APIError_1.default('This role does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            const currentUser = await this.findUnique({
                where: args.where,
                select: {
                    role: {
                        select: {
                            id: true,
                            slug: true
                        }
                    },
                    admin: {
                        select: {
                            id: true
                        }
                    }
                }
            });
            const { id, slug } = currentUser === null || currentUser === void 0 ? void 0 : currentUser.role;
            if (id !== isRoleExist.id && (slug === 'student' || slug === 'instructor' || ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.admin) && ((isRoleExist === null || isRoleExist === void 0 ? void 0 : isRoleExist.slug) === 'student' || (isRoleExist === null || isRoleExist === void 0 ? void 0 : isRoleExist.slug) === 'instructor')))) {
                const currentRole = (isRoleExist.slug !== 'instructor' && isRoleExist.slug !== 'student') ? 'admin' : isRoleExist.slug;
                const previousRole = (slug !== 'instructor' && slug !== 'student') ? 'admin' : slug;
                throw new APIError_1.default(`The ${previousRole} role cannot be changed to ${currentRole} role because each one has different profile settings`, HTTPStatusCode_1.default.BadRequest);
            }
        }
        return this.userRepository.update(args);
    }
    delete(id) {
        return this.userRepository.delete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IUserRepository')),
    __param(1, (0, inversify_1.inject)('IRoleService'))
], UserService);
//# sourceMappingURL=UserService.js.map