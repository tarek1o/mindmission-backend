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
exports.UserController = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWTGenerator_1 = require("../services/JWTGenerator");
const RequestManager_1 = require("../services/RequestManager");
const SendEmail_1 = require("../services/SendEmail");
const UserMapper_1 = require("../mapping/UserMapper");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let UserController = class UserController {
    constructor(userService, logService) {
        this.userService = userService;
        this.logService = logService;
        this.restrictedPropertiesForAdminOnly = ['isBlocked', 'isDeleted', 'role'];
        this.isUserCredentialsRight = async (email, password) => {
            const user = await this.userService.findFirst({
                where: {
                    email: { equals: email, mode: 'insensitive' }
                },
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });
            if (user && bcrypt_1.default.compareSync(password, user.password)) {
                return user;
            }
            return null;
        };
        this.getUserEnums = (0, express_async_handler_1.default)((request, response, next) => {
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All user enums are retrieved successfully', [client_1.$Enums.Platform]));
        });
        this.getAllUsers = (0, express_async_handler_1.default)(async (request, response, next) => {
            const findOptions = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const promiseResult = await Promise.all([
                this.userService.findMany(findOptions),
                this.userService.count({ where: findOptions.where })
            ]);
            const mappedUserResults = UserMapper_1.UserMapper.map(promiseResult[0]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All users are retrieved successfully', mappedUserResults, promiseResult[1], findOptions.skip, findOptions.take));
        });
        this.getUserById = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const user = await this.userService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select,
                include,
            });
            if (!user) {
                throw new APIError_1.default('This user does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            const mappedUserResults = UserMapper_1.UserMapper.map([user]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The user is retrieved successfully', mappedUserResults));
        });
        this.createUser = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const createdUser = await this.userService.create({ data: Object.assign(Object.assign({}, request.body.input), { role: { id: request.body.input.roleId } }), select, include });
            this.logService.log('ADD', 'USER', createdUser, request.user);
            const mappedUserResults = UserMapper_1.UserMapper.map([createdUser]);
            response.status(HTTPStatusCode_1.default.Created).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The user is created successfully', mappedUserResults));
        });
        this.updateUser = (0, express_async_handler_1.default)(async (request, response, next) => {
            var _a, _b, _c, _d;
            const { firstName, lastName, bio, picture, mobilePhone, whatsAppNumber, isActive, isBlocked, isDeleted, roleId, personalLinks } = request.body.input;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const updatedUser = await this.userService.update({
                data: {
                    id: +request.params.id,
                    firstName,
                    lastName,
                    bio,
                    picture,
                    mobilePhone,
                    whatsAppNumber,
                    isActive,
                    isBlocked,
                    isDeleted,
                    roleId,
                    personalLinks
                },
                select,
                include,
            });
            if ((((_b = (_a = request.user) === null || _a === void 0 ? void 0 : _a.role) === null || _b === void 0 ? void 0 : _b.slug) !== "student" && ((_d = (_c = request.user) === null || _c === void 0 ? void 0 : _c.role) === null || _d === void 0 ? void 0 : _d.slug) !== "instructor")) {
                this.logService.log('UPDATE', 'USER', updatedUser, request.user);
            }
            const mappedUserResults = UserMapper_1.UserMapper.map([updatedUser]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The user is updated successfully', mappedUserResults));
        });
        this.updateUserEmail = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { email, newEmail, password } = request.body.input;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const user = await this.isUserCredentialsRight(email, password);
            if (!user || user.id !== +request.params.id) {
                throw new APIError_1.default('Your email or password may be incorrect', HTTPStatusCode_1.default.BadRequest);
            }
            const updatedUser = await this.userService.update({
                data: {
                    id: user.id,
                    email: newEmail,
                    isEmailVerified: false
                },
                select,
                include,
            });
            const mappedUserResults = UserMapper_1.UserMapper.map([updatedUser]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Your email is updated successfully', [{
                    user: mappedUserResults[0],
                    token: JWTGenerator_1.JWTGenerator.generateAccessToken(updatedUser),
                }]));
        });
        this.generateEmailVerificationCode = (0, express_async_handler_1.default)(async (request, response, next) => {
            var _a, _b, _c, _d, _e;
            if ((_a = request.user) === null || _a === void 0 ? void 0 : _a.isSignWithSSO) {
                throw new APIError_1.default(`You can't verify your email because you sign with ${(_b = request.user.platform) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`, HTTPStatusCode_1.default.Conflict);
            }
            if ((_c = request.user) === null || _c === void 0 ? void 0 : _c.isEmailVerified) {
                throw new APIError_1.default('Your email is already verified', HTTPStatusCode_1.default.Conflict);
            }
            const token = JWTGenerator_1.JWTGenerator.generateEmailVerificationToken(request.user);
            await this.userService.update({
                data: {
                    id: (_d = request.user) === null || _d === void 0 ? void 0 : _d.id,
                    emailVerificationCode: token
                },
                select: {
                    id: true,
                }
            });
            const message = `<!DOCTYPE html>
		<html lang="en">
		<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<style>
						body {
							font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
							background-color: #f8f8f8;
							margin: 0;
							padding: 0;
							display: flex;
							justify-content: center;
							align-items: center;
							height: 100vh;
						}
						h2 {
							color: #333;
						}
						p {
							color: #555;
							margin-bottom: 20px;
						}
						a {
							display: inline-block;
							padding: 10px 20px;
							background-color: #007BFF;
							color: #fff !important;
							text-decoration: none;
							border-radius: 5px;
						}
						a:hover {
							background-color: #0056b3;
						}
				</style>
		</head>
		<body>
			<div>
				<h2>Verify Your Email Address</h2>
				<p>Thank you for registering with us! To activate your account, please click the button below to verify your email address.</p>
				<a href="${process.env.Frontend_Verity_Email_Route}?token=${token}">Verify Email Address</a>
				<p>If you did not register for our service, you can safely ignore this email.</p>
				<p>
					<span>Best regards,</span>
					<br/>
					<span>${process.env.APP_Name} Team</span>
				</p>
			</div>
		</body>
		</html>
		`;
            await SendEmail_1.SendEmail.send({
                to: (_e = request.user) === null || _e === void 0 ? void 0 : _e.email,
                subject: 'Email Verification',
                message
            });
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Verification link is sent to you on your email, please check your inbox'));
        });
        this.confirmEmailVerificationCode = (0, express_async_handler_1.default)(async (request, response, next) => {
            var _a;
            const { token } = request.body.input;
            const payload = JWTGenerator_1.JWTGenerator.verifyEmailVerificationToken(token);
            const user = await this.userService.findUnique({
                where: {
                    id: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id,
                },
                select: {
                    id: true,
                    email: true,
                    emailVerificationCode: true
                }
            });
            if (!user || user.email !== payload.email || user.emailVerificationCode !== token) {
                throw new APIError_1.default('Invalid token, please try to access new verification request and try again.', HTTPStatusCode_1.default.BadRequest);
            }
            !user.isEmailVerified && await this.userService.update({
                data: {
                    id: user.id,
                    isEmailVerified: true,
                    emailVerificationCode: null
                },
                select: {
                    id: true
                }
            });
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Your email is verified successfully'));
        });
        this.updateUserPassword = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { email, newPassword, password } = request.body.input;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const user = await this.isUserCredentialsRight(email, password);
            if (!user || user.id !== +request.params.id) {
                throw new APIError_1.default('Your email or password may be incorrect', HTTPStatusCode_1.default.BadRequest);
            }
            const updatedUser = await this.userService.update({
                data: {
                    id: user.id,
                    password: newPassword
                },
                select,
                include,
            });
            const mappedUserResults = UserMapper_1.UserMapper.map([updatedUser]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'Your password is updated successfully', [{
                    user: mappedUserResults[0],
                    token: JWTGenerator_1.JWTGenerator.generateAccessToken(updatedUser),
                }]));
        });
        this.deleteUser = (0, express_async_handler_1.default)(async (request, response, next) => {
            const deletedUser = await this.userService.delete(+request.params.id);
            this.logService.log('DELETE', 'USER', deletedUser, request.user);
            response.status(HTTPStatusCode_1.default.NoContent).json();
        });
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IUserService')),
    __param(1, (0, inversify_1.inject)('ILogService'))
], UserController);
//# sourceMappingURL=UserController.js.map