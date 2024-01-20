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
    async isEmailExist(email, id) {
        const user = await this.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true
            }
        });
        if (user && (id ? user.id !== id : true)) {
            return true;
        }
        ;
        return false;
    }
    ;
    count(args) {
        return this.userRepository.count(args);
    }
    ;
    findMany(args) {
        return this.userRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.userRepository.findUnique(args);
    }
    ;
    findFirst(args) {
        return this.userRepository.findFirst(args);
    }
    ;
    async create(args, transaction) {
        const { firstName, lastName, email, password, mobilePhone, whatsAppNumber, bio, picture, role, refreshToken, instructor } = args.data;
        if (await this.isEmailExist(email)) {
            throw new APIError_1.default('This email already exists', HTTPStatusCode_1.default.BadRequest);
        }
        ;
        const isRoleExist = await this.roleService.findUnique({
            where: Object.assign({}, role),
            select: {
                id: true,
                slug: true
            }
        });
        if (!isRoleExist) {
            throw new APIError_1.default('This role does not exist', HTTPStatusCode_1.default.BadRequest);
        }
        return this.userRepository.create({
            data: {
                firstName,
                lastName,
                email,
                password: bcrypt_1.default.hashSync(password, 10),
                mobilePhone,
                whatsAppNumber,
                bio,
                picture,
                refreshToken,
                role: {
                    connect: Object.assign({}, role)
                },
                student: isRoleExist.slug === "student" ? {
                    create: {}
                } : undefined,
                instructor: isRoleExist.slug === "instructor" ? {
                    create: Object.assign({}, instructor)
                } : undefined,
                admin: (isRoleExist.slug !== "instructor" && isRoleExist.slug !== "student") ? {
                    create: {}
                } : undefined,
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    async update(args, transaction) {
        var _a, _b;
        const { id, firstName, lastName, email, isEmailVerified, password, passwordUpdatedTime, resetPasswordCode, bio, picture, mobilePhone, whatsAppNumber, refreshToken, isOnline, isActive, isBlocked, isDeleted, roleId, personalLinks } = args.data;
        if (resetPasswordCode && resetPasswordCode.code && !resetPasswordCode.isVerified) {
            resetPasswordCode.code = bcrypt_1.default.hashSync(args.data.resetPasswordCode.code.toString(), 10);
        }
        if (email && await this.isEmailExist(email)) {
            throw new APIError_1.default('This email already exists', HTTPStatusCode_1.default.BadRequest);
        }
        if (personalLinks) {
            const currentUser = await this.findUnique({
                where: {
                    id
                },
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
        if (roleId) {
            const isRoleExist = await this.roleService.findUnique({
                where: {
                    id: roleId
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
                where: {
                    id: args.data.id
                },
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
        return this.userRepository.update({
            where: {
                id
            },
            data: {
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                email: email || undefined,
                isEmailVerified: isEmailVerified || undefined,
                password: password ? bcrypt_1.default.hashSync(password.toString(), 10) : undefined,
                resetPasswordCode: resetPasswordCode || undefined,
                passwordUpdatedTime: passwordUpdatedTime || undefined,
                bio: bio,
                picture: picture || undefined,
                mobilePhone: mobilePhone || undefined,
                whatsAppNumber: whatsAppNumber || undefined,
                refreshToken: refreshToken || undefined,
                isOnline: isOnline,
                isActive: isActive,
                isBlocked: isBlocked,
                isDeleted: isDeleted,
                role: roleId ? {
                    connect: {
                        id: roleId
                    }
                } : undefined,
                personalLinks: personalLinks ? {
                    upsert: personalLinks.map(({ platform, link }) => {
                        return {
                            where: {
                                userId_platform: {
                                    userId: id,
                                    platform: platform.toUpperCase(),
                                }
                            },
                            update: {
                                link
                            },
                            create: {
                                platform: platform.toUpperCase(),
                                link
                            }
                        };
                    })
                } : undefined,
                lastSeen: isOnline === false ? new Date() : undefined
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return this.userRepository.delete(id, transaction);
    }
    ;
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IUserRepository')),
    __param(1, (0, inversify_1.inject)('IRoleService'))
], UserService);
//# sourceMappingURL=UserService.js.map