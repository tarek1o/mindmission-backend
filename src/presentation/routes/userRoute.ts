import express from 'express';
import container from '../dependencyInjection/DI'
import { idValidation} from '../middlewares/express-validator/idValidation';
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import {addUserValidation, updateUserValidation, updateUserEmailValidation, updateUserPasswordValidation} from '../middlewares/express-validator/userValidator';
import {UserController} from '../controllers/UserController';

const {isAuthenticated, isAuthorized, isCurrentUserRoleInBlackList, isParamIdEqualCurrentUserId, restrictedUpdateForAdminOnly} = container.get<Authorization>('Authorization');
const {getAllUsers, getUserById, createUser, restrictedPropertiesForAdminOnly, updateUser, updateUserEmail, updateUserPassword, deleteUser } = container.get<UserController>('UserController');

const userRouter = express.Router();

userRouter.route("/")
	.put(isAuthenticated, isAuthorized('User'), isCurrentUserRoleInBlackList('instructor', 'student'), getAllUsers)
	.post(isAuthenticated, isAuthorized('User'), addUserValidation, createUser);

userRouter.route("/:id")
	.put(idValidation, isAuthenticated, isAuthorized('User'), getUserById)
	.patch(idValidation, isAuthenticated, isAuthorized('User'), isParamIdEqualCurrentUserId(), restrictedUpdateForAdminOnly(restrictedPropertiesForAdminOnly), updateUserValidation, updateUser)
	.delete(idValidation, isAuthenticated, isAuthorized('User'), isParamIdEqualCurrentUserId(), deleteUser);

userRouter.route("/:id/update/email")
	.patch(isAuthenticated, isAuthorized('User'), isParamIdEqualCurrentUserId(), updateUserEmailValidation, updateUserEmail);

userRouter.route("/:id/update/password")
	.patch(isAuthenticated, isAuthorized('User'), isParamIdEqualCurrentUserId(), updateUserPasswordValidation, updateUserPassword);

export default userRouter;