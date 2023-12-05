import express from 'express';
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import container from '../dependencyInjection/DI'
import {ModelPermissionController} from "../controllers/ModelPermissionController"

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllModelPermissions} = new ModelPermissionController();
const roleRouter = express.Router();

roleRouter.route("/get")
	.post(isAuthenticated, isAuthorized('Role', 'GET'), getAllModelPermissions)

export default roleRouter;