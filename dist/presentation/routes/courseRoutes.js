"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const courseValidator_1 = require("../middlewares/express-validator/courseValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getCourseEnums, courseAggregates, getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = DI_1.default.get('CourseController');
const courseRouter = express_1.default.Router();
courseRouter.route("/enums")
    .post(getCourseEnums);
courseRouter.route("/aggregate")
    .post(isAuthenticated, isAuthorized('Course', 'GET'), courseAggregates);
courseRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Course', 'GET'), getAllCourses);
courseRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Course', 'GET'), getCourseById);
courseRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Course', 'POST'), courseValidator_1.addCourseValidation, createCourse);
courseRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Course', 'PATCH'), courseValidator_1.updateCourseValidation, updateCourse);
courseRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Course', 'DELETE'), deleteCourse);
exports.default = courseRouter;
//# sourceMappingURL=courseRoutes.js.map