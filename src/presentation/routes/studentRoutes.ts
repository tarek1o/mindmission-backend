import express from 'express';
import container from '../dependencyInjection/DI'
import {idValidation} from "../middlewares/express-validator/idValidation";
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import { StudentController } from '../controllers/StudentController';

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllStudents, getStudentById, addToWishlist, removeFromWishlist} = container.get<StudentController>('StudentController');

const roleRouter = express.Router();

roleRouter.route("/get")
	.post(isAuthenticated, isAuthorized('Student', 'GET'), getAllStudents);

roleRouter.route("/get/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Student', 'GET'), getStudentById);

export default roleRouter;