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
exports.Authorization = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const inversify_1 = require("inversify");
const ModelPermission_1 = require("../../types/ModelPermission");
const JWTGenerator_1 = require("../../services/JWTGenerator");
const APIError_1 = __importDefault(require("../../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../enums/HTTPStatusCode"));
let Authorization = class Authorization {
    constructor(userService) {
        this.userService = userService;
        this.isCurrentUserRoleInList = (request, roleList) => {
            var _a;
            if (((_a = request === null || request === void 0 ? void 0 : request.user) === null || _a === void 0 ? void 0 : _a.role) && roleList.includes(request.user.role.slug)) {
                return true;
            }
            return false;
        };
        this.isAuthenticated = (0, express_async_handler_1.default)(async (request, response, next) => {
            if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
                const token = request.headers.authorization.split(" ")[1];
                const decodedPayload = JWTGenerator_1.JWTGenerator.verifyAccessToken(token);
                const user = await this.userService.findFirst({
                    where: {
                        email: { equals: decodedPayload === null || decodedPayload === void 0 ? void 0 : decodedPayload.email, mode: 'insensitive' }
                    },
                    include: {
                        role: true
                    }
                });
                if (user) {
                    if (user === null || user === void 0 ? void 0 : user.passwordUpdatedTime) {
                        const passwordUpdatedTimeInSeconds = parseInt(`${user.passwordUpdatedTime.getTime() / 1000}`, 10);
                        if (passwordUpdatedTimeInSeconds > decodedPayload.iat) {
                            throw new APIError_1.default("Unauthorized, try to login again", HTTPStatusCode_1.default.Unauthorized);
                        }
                    }
                    if (user.isBlocked || user.isDeleted) {
                        throw new APIError_1.default('Your are blocked, try to contact with our support team', HTTPStatusCode_1.default.Forbidden);
                    }
                    request.user = user;
                    next();
                    return;
                }
            }
            throw new APIError_1.default("Unauthorized, try to login again", HTTPStatusCode_1.default.Unauthorized);
        });
        this.isAuthorized = (modelName, method) => (0, express_async_handler_1.default)(async (request, response, next) => {
            var _a, _b, _c;
            let permission = method.toLowerCase();
            if ((_b = (_a = request.user) === null || _a === void 0 ? void 0 : _a.role) === null || _b === void 0 ? void 0 : _b.allowedModels) {
                for (const allowedModel of (_c = request.user) === null || _c === void 0 ? void 0 : _c.role.allowedModels) {
                    if (allowedModel.modelName.toLowerCase() === modelName.toLowerCase() && allowedModel.permissions.includes(permission)) {
                        next();
                        return;
                    }
                }
            }
            permission = (permission === 'post') ? 'add' : (permission === 'patch') ? 'update' : (permission === 'put') ? 'get' : permission;
            throw new APIError_1.default(`Not Allowed to ${permission} ${modelName}`, HTTPStatusCode_1.default.Forbidden);
        });
        this.isCurrentUserRoleInWhiteList = (...roleWhiteList) => (0, express_async_handler_1.default)(async (request, response, next) => {
            if (this.isCurrentUserRoleInList(request, roleWhiteList)) {
                next();
            }
            else {
                throw new APIError_1.default('Not allow to access this route', HTTPStatusCode_1.default.Forbidden);
            }
        });
        this.isCurrentUserRoleInBlackList = (...roleBlackList) => (0, express_async_handler_1.default)(async (request, response, next) => {
            if (this.isCurrentUserRoleInList(request, roleBlackList)) {
                throw new APIError_1.default('Not allow to access this route', HTTPStatusCode_1.default.Forbidden);
            }
            else {
                next();
            }
        });
        this.isParamIdEqualCurrentUserId = (userId = 'id') => (0, express_async_handler_1.default)(async (request, response, next) => {
            if (request.user && +request.params[userId] !== request.user.id && this.isCurrentUserRoleInList(request, ['instructor', 'student'])) {
                throw new APIError_1.default('Not allow to access this route, the Id in route not match the Id of the current user', HTTPStatusCode_1.default.Forbidden);
            }
            next();
        });
        this.restrictedUpdateForAdminOnly = (restrictedProperties) => (0, express_async_handler_1.default)(async (request, response, next) => {
            var _a, _b, _c, _d;
            if (((_b = (_a = request.user) === null || _a === void 0 ? void 0 : _a.role) === null || _b === void 0 ? void 0 : _b.slug) === ModelPermission_1.AllowedModels.Instructors || ((_d = (_c = request.user) === null || _c === void 0 ? void 0 : _c.role) === null || _d === void 0 ? void 0 : _d.slug) === ModelPermission_1.AllowedModels.Students) {
                for (const property of restrictedProperties) {
                    delete request.body.input[property];
                }
            }
            ;
            next();
        });
    }
};
exports.Authorization = Authorization;
exports.Authorization = Authorization = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IUserService'))
], Authorization);
//# sourceMappingURL=AuthorizationValidator.js.map