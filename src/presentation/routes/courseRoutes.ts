import express from 'express';
import container from '../dependencyInjection/DI'
import {idValidation} from "../middlewares/express-validator/idValidation";
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import {addCourseValidation, updateCourseValidation} from "../middlewares/express-validator/courseValidator"
import { CourseController } from '../controllers/CourseController';

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse} = container.get<CourseController>('CourseController');

const CourseRouter = express.Router();

CourseRouter.route("/get")
	.post(isAuthenticated, isAuthorized('Course', 'GET'), getAllCourses);

CourseRouter.route("/get/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Course', 'GET'), getCourseById);

CourseRouter.route("/add")
	.post(isAuthenticated, isAuthorized('Course', 'POST'), addCourseValidation, createCourse);

CourseRouter.route("/update/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Course', 'PATCH'), updateCourseValidation, updateCourse);

CourseRouter.route("/delete/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Course', 'DELETE'), deleteCourse);

export default CourseRouter;