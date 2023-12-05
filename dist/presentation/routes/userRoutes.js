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
userRouter.route("/get")
    .post(isAuthenticated, isAuthorized('User', 'GET'), isCurrentUserRoleInBlackList('instructor', 'student'), getAllUsers);
userRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('User', 'GET'), getUserById);
userRouter.route("/add")
    .post(isAuthenticated, isAuthorized('User', 'POST'), userValidator_1.addUserValidation, createUser);
userRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('User', 'PATCH'), isParamIdEqualCurrentUserId(), restrictedUpdateForAdminOnly(restrictedPropertiesForAdminOnly), userValidator_1.updateUserValidation, updateUser);
userRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('User', 'DELETE'), isParamIdEqualCurrentUserId(), deleteUser);
userRouter.route("/update/:id/email")
    .post(isAuthenticated, isAuthorized('User', 'PATCH'), isParamIdEqualCurrentUserId(), userValidator_1.updateUserEmailValidation, updateUserEmail);
userRouter.route("/update/:id/password")
    .post(isAuthenticated, isAuthorized('User', 'PATCH'), isParamIdEqualCurrentUserId(), userValidator_1.updateUserPasswordValidation, updateUserPassword);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map