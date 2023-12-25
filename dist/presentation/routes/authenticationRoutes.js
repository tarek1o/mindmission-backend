"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const authenticationValidator_1 = require("../middlewares/express-validator/authenticationValidator");
const instructorValidator_1 = require("../middlewares/express-validator/instructorValidator");
const { signup, login, forgetPassword, verifyResetPasswordCode, resetPassword, refreshToken } = DI_1.default.get('AuthenticationController');
const authRouter = express_1.default.Router();
authRouter.route("/signup/student")
    .post(authenticationValidator_1.signupValidation, signup);
authRouter.route("/signup/instructor")
    .post(authenticationValidator_1.signupValidation, instructorValidator_1.addInstructorValidation, signup);
authRouter.route("/login")
    .post(authenticationValidator_1.loginValidation, login);
authRouter.route("/password/forget")
    .post(authenticationValidator_1.forgetPasswordValidation, forgetPassword);
authRouter.route("/password/verify")
    .post(authenticationValidator_1.verifyResetPasswordCodeValidation, verifyResetPasswordCode);
authRouter.route("/password/reset")
    .post(authenticationValidator_1.resetPasswordValidation, resetPassword);
authRouter.route('/refresh/token')
    .post(authenticationValidator_1.refreshTokenValidation, refreshToken);
exports.default = authRouter;
//# sourceMappingURL=authenticationRoutes.js.map