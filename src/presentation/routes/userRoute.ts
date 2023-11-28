import express from 'express';
import container from '../dependencyInjection/DI'
import { idValidation} from '../middlewares/express-validator/idValidation';
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import {addUserValidation, updateUserValidation, updateUserEmailValidation, updateUserPasswordValidation} from '../middlewares/express-validator/userValidator';
import {UserController} from '../controllers/UserController';

const {isAuthenticated, isAuthorized, isCurrentUserRoleInBlackList, isParamIdEqualCurrentUserId, restrictedUpdateForAdminOnly} = container.get<Authorization>('Authorization');
const {getAllUsers, getUserById, createUser, restrictedPropertiesForAdminOnly, updateUser, updateUserEmail, updateUserPassword, deleteUser } = container.get<UserController>('UserController');

const userRouter = express.Router();

userRouter.route("/get")
	.post(isAuthenticated, isAuthorized('User', 'GET'), isCurrentUserRoleInBlackList('instructor', 'student'), getAllUsers);

userRouter.route("/get/:id")
	.post(idValidation, isAuthenticated, isAuthorized('User', 'GET'), getUserById)

userRouter.route("/add")
	.post(isAuthenticated, isAuthorized('User', 'POST'), addUserValidation, createUser);

userRouter.route("/update/:id")
	.post(idValidation, isAuthenticated, isAuthorized('User', 'PATCH'), isParamIdEqualCurrentUserId(), restrictedUpdateForAdminOnly(restrictedPropertiesForAdminOnly), updateUserValidation, updateUser);

userRouter.route("/delete/:id")
	.post(idValidation, isAuthenticated, isAuthorized('User', 'DELETE'), isParamIdEqualCurrentUserId(), deleteUser);

userRouter.route("/update/:id/email")
	.post(isAuthenticated, isAuthorized('User', 'PATCH'), isParamIdEqualCurrentUserId(), updateUserEmailValidation, updateUserEmail);

userRouter.route("/update/:id/password")
	.post(isAuthenticated, isAuthorized('User', 'PATCH'), isParamIdEqualCurrentUserId(), updateUserPasswordValidation, updateUserPassword);

export default userRouter;