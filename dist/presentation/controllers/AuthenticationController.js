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
exports.AuthenticationController = void 0;
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SendEmail_1 = require("../services/SendEmail");
const JWTGenerator_1 = require("../services/JWTGenerator");
const RequestManager_1 = require("../services/RequestManager");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const UserMapper_1 = require("../mapping/UserMapper");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let AuthenticationController = class AuthenticationController {
    constructor(userService) {
        this.userService = userService;
        this.isRefreshTokenExpiredSoon = (refreshToken) => {
            const { exp } = JWTGenerator_1.JWTGenerator.decode(refreshToken);
            if (exp) {
                const secondsRemaining = exp - Math.floor(Date.now() / 1000);
                const daysRemaining = Math.ceil(secondsRemaining / 86400); // 60 * 60 * 24 = 86400 sec per day
                if (daysRemaining < 3) {
                    return true;
                }
            }
            return false;
        };
        this.signup = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { firstName, lastName, email, password, mobilePhone, whatsAppNumber, bio, picture, specialization, teachingType, videoProAcademy, haveAudience } = request.body.input;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const slug = (specialization && teachingType && videoProAcademy && haveAudience) ? 'instructor' : 'student';
            const createdUser = await this.userService.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password,
                    mobilePhone,
                    whatsAppNumber,
                    bio,
                    picture,
                    refreshToken: JWTGenerator_1.JWTGenerator.generateRefreshToken({ firstName, lastName, email, picture }),
                    role: {
                        slug
                    },
                    instructor: slug === "instructor" ? {
                        specialization,
                        teachingType,
                        videoProAcademy,
                        haveAudience,
                    } : undefined,
                },
                select,
                include,
            });
            response.status(HTTPStatusCode_1.default.Created).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Signup successfully', [{
                    user: UserMapper_1.UserMapper.map([createdUser])[0],
                    token: JWTGenerator_1.JWTGenerator.generateAccessToken(createdUser),
                }]));
        });
        this.login = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { email, password } = request.body.input;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const isExist = await this.userService.findFirst({
                where: {
                    email: { equals: email, mode: 'insensitive' }
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    picture: true,
                    password: true,
                    isDeleted: true,
                    isBlocked: true,
                    refreshToken: true
                },
                include
            });
            if (!isExist || isExist.isDeleted || !bcrypt_1.default.compareSync(password, isExist.password)) {
                throw new APIError_1.default('Your email or password may be incorrect', HTTPStatusCode_1.default.BadRequest);
            }
            if (isExist.isBlocked) {
                throw new APIError_1.default('Your are blocked, try to contact with our support team', HTTPStatusCode_1.default.Forbidden);
            }
            let regeneratedRefreshToken;
            if (!isExist.refreshToken || (isExist.refreshToken && this.isRefreshTokenExpiredSoon(isExist.refreshToken))) {
                regeneratedRefreshToken = JWTGenerator_1.JWTGenerator.generateRefreshToken(isExist);
            }
            const updatedUser = await this.userService.update({
                data: {
                    id: isExist.id,
                    isActive: true,
                    refreshToken: regeneratedRefreshToken ? regeneratedRefreshToken : undefined
                },
                select,
                include,
            });
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Login successfully', [{
                    user: UserMapper_1.UserMapper.map([updatedUser])[0],
                    token: JWTGenerator_1.JWTGenerator.generateAccessToken(isExist),
                }]));
        });
        this.forgetPassword = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { email } = request.body.input;
            const user = await this.userService.findUnique({
                where: {
                    email
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                }
            });
            if (user) {
                const resetCode = Math.floor(100000 + Math.random() * 900000);
                const message = `
        <h3 style="color: black">Hi ${user.firstName} ${user.lastName}</h3>
        <p style="color: black">We received a request to reset your password on your ${process.env.APP_Name} account.</p>
        <p style="color: black">This is your reset password code</p
        <strong style="font-size: 18px">${resetCode}</strong>
        <p style="color: black">Enter this code to complete the reset</p>
        <p style="color: black">Thanks for helping us keep your account secure.</p>
        <p style="color: black">${process.env.APP_Name} Team</p>
      `;
                await SendEmail_1.SendEmail.send({ to: user.email, subject: "Reset Password Code", message: message });
                await this.userService.update({
                    data: {
                        id: user.id,
                        resetPasswordCode: {
                            code: `${resetCode}`,
                            expirationTime: Date.now() + 5 * 60 * 1000, // 5 minutes from the time of reset code generation
                            isVerified: false
                        }
                    },
                    select: {
                        id: true
                    }
                });
            }
            ;
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'If your email exists, you will receive a verification code'));
        });
        this.verifyResetPasswordCode = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { email } = request.body.input;
            const user = await this.userService.findUnique({
                where: {
                    email
                },
                select: {
                    id: true,
                    resetPasswordCode: true,
                }
            });
            if (user) {
                const { code, expirationTime, isVerified } = user.resetPasswordCode;
                if (user.resetPasswordCode && code && bcrypt_1.default.compareSync(request.body.input.code.toString(), code) && expirationTime >= Date.now() && !isVerified) {
                    await this.userService.update({
                        data: {
                            id: user.id,
                            resetPasswordCode: {
                                code,
                                expirationTime,
                                isVerified: true
                            }
                        },
                        select: {
                            id: true
                        }
                    });
                    response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Your code is verified'));
                    return;
                }
            }
            throw new APIError_1.default("Not found user or Invalid code, try to ask another code and try again", HTTPStatusCode_1.default.BadRequest);
        });
        this.resetPassword = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { email, newPassword } = request.body.input;
            const user = await this.userService.findFirst({
                where: {
                    email: { equals: email, mode: 'insensitive' }
                },
                select: {
                    id: true,
                    resetPasswordCode: true
                }
            });
            if (user && user.resetPasswordCode) {
                const { expirationTime, isVerified } = user.resetPasswordCode;
                if (expirationTime >= Date.now() && isVerified) {
                    await this.userService.update({
                        data: {
                            id: user.id,
                            password: newPassword,
                            resetPasswordCode: undefined,
                            passwordUpdatedTime: new Date()
                        },
                        select: {
                            id: true,
                        }
                    });
                    response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Your password is reset successfully'));
                    return;
                }
            }
            throw new APIError_1.default("This code expired, try to ask another code", HTTPStatusCode_1.default.BadRequest);
        });
        this.refreshToken = (0, express_async_handler_1.default)(async (request, response, next) => {
            let { accessToken, refreshToken } = request.body.input;
            if (JWTGenerator_1.JWTGenerator.isTokenExpired(accessToken)) {
                JWTGenerator_1.JWTGenerator.verifyRefreshToken(refreshToken);
                const accessTokenPayload = JWTGenerator_1.JWTGenerator.decode(accessToken);
                const user = await this.userService.findFirst({
                    where: {
                        email: { equals: accessTokenPayload.email, mode: 'insensitive' }
                    },
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        picture: true,
                        refreshToken: true
                    }
                });
                if (!user || user.refreshToken !== refreshToken) {
                    throw new APIError_1.default('Invalid tokens, try to login again', HTTPStatusCode_1.default.BadRequest);
                }
                accessToken = JWTGenerator_1.JWTGenerator.generateAccessToken(user);
                if (this.isRefreshTokenExpiredSoon(refreshToken)) {
                    refreshToken = JWTGenerator_1.JWTGenerator.generateRefreshToken(user);
                    await this.userService.update({
                        data: {
                            id: user.id,
                            refreshToken
                        },
                        select: {
                            id: true
                        }
                    });
                }
                ;
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Your access token has been refreshed successfully.', [{
                    accessToken,
                    refreshToken
                }]));
        });
    }
    ;
};
exports.AuthenticationController = AuthenticationController;
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IUserService'))
], AuthenticationController);
//# sourceMappingURL=AuthenticationController.js.map