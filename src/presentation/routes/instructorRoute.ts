import express from 'express';
import container from '../dependencyInjection/DI'
import {idValidation} from "../middlewares/express-validator/idValidation";
import {updateInstructorValidation} from "../middlewares/express-validator/instructorValidator";
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import { InstructorController } from '../controllers/InstructorController';

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllInstructors, getInstructorById, updateInstructor} = container.get<InstructorController>('InstructorController');

const roleRouter = express.Router();

roleRouter.route("/get")
	.post(isAuthenticated, isAuthorized('Instructor', 'GET'), getAllInstructors);

roleRouter.route("/get/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Instructor', 'GET'), getInstructorById)

roleRouter.route("/update/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Instructor', 'GET'), updateInstructorValidation, updateInstructor)

export default roleRouter;