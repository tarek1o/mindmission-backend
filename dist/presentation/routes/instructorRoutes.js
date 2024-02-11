"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const instructorValidator_1 = require("../middlewares/express-validator/instructorValidator");
const { isAuthenticated, isAuthorized, isCurrentUserRoleInBlackList } = DI_1.default.get('Authorization');
const { getInstructorEnums, getAllInstructors, getInstructorById, updateInstructor } = DI_1.default.get('InstructorController');
const instructorRouter = express_1.default.Router();
instructorRouter.route("/enums")
    .post(getInstructorEnums);
instructorRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Instructor', 'GET'), isCurrentUserRoleInBlackList("instructor", "student"), getAllInstructors);
instructorRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Instructor', 'GET'), getInstructorById);
instructorRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Instructor', 'PATCH'), instructorValidator_1.updateInstructorValidation, updateInstructor);
exports.default = instructorRouter;
//# sourceMappingURL=instructorRoutes.js.map