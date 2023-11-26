import express from 'express';
import container from '../dependencyInjection/DI'
import {idValidation} from "../middlewares/express-validator/idValidation";
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import { LogController } from '../controllers/LogController';

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllLogs, getLogById} = container.get<LogController>('LogController');

const roleRouter = express.Router();

roleRouter.route("/")
	.put(isAuthenticated, isAuthorized('Log'), getAllLogs);

roleRouter.route("/:id")
	.put(idValidation, isAuthenticated, isAuthorized('Log'), getLogById)

export default roleRouter;