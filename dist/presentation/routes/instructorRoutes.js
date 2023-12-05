"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const instructorValidator_1 = require("../middlewares/express-validator/instructorValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllInstructors, getInstructorById, updateInstructor } = DI_1.default.get('InstructorController');
const roleRouter = express_1.default.Router();
roleRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Instructor', 'GET'), getAllInstructors);
roleRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Instructor', 'GET'), getInstructorById);
roleRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Instructor', 'PATCH'), instructorValidator_1.updateInstructorValidation, updateInstructor);
exports.default = roleRouter;
//# sourceMappingURL=instructorRoutes.js.map