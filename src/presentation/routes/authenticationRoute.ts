import express from 'express';
import container from '../dependencyInjection/DI'
import { signupValidation, loginValidation, forgetPasswordValidation, verifyResetPasswordCodeValidation, resetPasswordValidation, refreshTokenValidation } from '../middlewares/express-validator/authenticationValidator';
import {addInstructorValidation} from "../middlewares/express-validator/instructorValidator";
import {AuthenticationController} from '../controllers/AuthenticationController';

const {signup, login, forgetPassword, verifyResetPasswordCode, resetPassword, refreshToken} = container.get<AuthenticationController>('AuthenticationController');

const authRouter = express.Router();

authRouter.route("/signup/student")
	.post(signupValidation, signup);

authRouter.route("/signup/instructor")
	.post(signupValidation, addInstructorValidation, signup);

authRouter.route("/login")
	.post(loginValidation, login);

authRouter.route("/password/forget")
	.post(forgetPasswordValidation, forgetPassword);

authRouter.route("/password/verify")
	.post(verifyResetPasswordCodeValidation, verifyResetPasswordCode);

authRouter.route("/password/reset")
	.post(resetPasswordValidation, resetPassword);

authRouter.route('/refresh/token')
	.post(refreshTokenValidation, refreshToken);

export default authRouter;
