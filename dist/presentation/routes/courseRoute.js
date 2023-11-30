"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const courseValidator_1 = require("../middlewares/express-validator/courseValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = DI_1.default.get('CourseController');
const CourseRouter = express_1.default.Router();
CourseRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Course', 'GET'), getAllCourses);
CourseRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Course', 'GET'), getCourseById);
CourseRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Course', 'POST'), courseValidator_1.addCourseValidation, createCourse);
CourseRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Course', 'PATCH'), /*updateCourseValidation,*/ updateCourse);
CourseRouter.route("/delete/:id")
    .delete(idValidation_1.idValidation, isAuthenticated, isAuthorized('Course', 'DELETE'), deleteCourse);
exports.default = CourseRouter;
//# sourceMappingURL=courseRoute.js.map