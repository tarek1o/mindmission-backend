"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const userValidator_1 = require("../middlewares/express-validator/userValidator");
const { isAuthenticated, isAuthorized, isCurrentUserRoleInBlackList, isParamIdEqualCurrentUserId, restrictedUpdateForAdminOnly } = DI_1.default.get('Authorization');
const { getAllUsers, getUserById, createUser, restrictedPropertiesForAdminOnly, updateUser, updateUserEmail, updateUserPassword, deleteUser } = DI_1.default.get('UserController');
const userRouter = express_1.default.Router();
userRouter.route("/")
    .put(isAuthenticated, isAuthorized('User'), isCurrentUserRoleInBlackList('instructor', 'student'), getAllUsers)
    .post(isAuthenticated, isAuthorized('User'), userValidator_1.addUserValidation, createUser);
userRouter.route("/:id")
    .put(idValidation_1.idValidation, isAuthenticated, isAuthorized('User'), getUserById)
    .patch(idValidation_1.idValidation, isAuthenticated, isAuthorized('User'), isParamIdEqualCurrentUserId(), restrictedUpdateForAdminOnly(restrictedPropertiesForAdminOnly), userValidator_1.updateUserValidation, updateUser)
    .delete(idValidation_1.idValidation, isAuthenticated, isAuthorized('User'), isParamIdEqualCurrentUserId(), deleteUser);
userRouter.route("/:id/update/email")
    .patch(isAuthenticated, isAuthorized('User'), isParamIdEqualCurrentUserId(), userValidator_1.updateUserEmailValidation, updateUserEmail);
userRouter.route("/:id/update/password")
    .patch(isAuthenticated, isAuthorized('User'), isParamIdEqualCurrentUserId(), userValidator_1.updateUserPasswordValidation, updateUserPassword);
exports.default = userRouter;
//# sourceMappingURL=userRoute.js.map