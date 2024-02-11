"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const userValidator_1 = require("../middlewares/express-validator/userValidator");
const { isAuthenticated, isAuthorized, isCurrentUserRoleInBlackList, isCurrentUserRoleInWhiteList, isParamIdEqualCurrentUserId, restrictedUpdateForAdminOnly } = DI_1.default.get('Authorization');
const { getUserEnums, getAllUsers, getUserById, createUser, restrictedPropertiesForAdminOnly, updateUser, updateUserEmail, generateEmailVerificationCode, confirmEmailVerificationCode, updateUserPassword, deleteUser } = DI_1.default.get('UserController');
const userRouter = express_1.default.Router();
userRouter.route("/enums")
    .post(getUserEnums);
userRouter.route("/get")
    .post(isAuthenticated, isAuthorized('User', 'GET'), isCurrentUserRoleInBlackList('instructor', 'student'), getAllUsers);
userRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isParamIdEqualCurrentUserId(), isAuthorized('User', 'GET'), getUserById);
userRouter.route("/add")
    .post(isAuthenticated, isAuthorized('User', 'POST'), userValidator_1.addUserValidation, createUser);
userRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('User', 'PATCH'), isParamIdEqualCurrentUserId(), restrictedUpdateForAdminOnly(restrictedPropertiesForAdminOnly), userValidator_1.updateUserValidation, updateUser);
userRouter.route("/update/:id/email")
    .post(isAuthenticated, isAuthorized('User', 'PATCH'), isCurrentUserRoleInWhiteList("instructor", "student"), userValidator_1.updateUserEmailValidation, updateUserEmail);
userRouter.route("/verify/email/ask")
    .post(isAuthenticated, generateEmailVerificationCode);
userRouter.route("/verify/email/confirm")
    .post(isAuthenticated, userValidator_1.confirmEmailVerificationCodeValidation, confirmEmailVerificationCode);
userRouter.route("/update/:id/password")
    .post(isAuthenticated, isAuthorized('User', 'PATCH'), isCurrentUserRoleInWhiteList("instructor", "student"), userValidator_1.updateUserPasswordValidation, updateUserPassword);
userRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('User', 'DELETE'), isParamIdEqualCurrentUserId(), deleteUser);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map