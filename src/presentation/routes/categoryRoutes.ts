import express from 'express';
import container from '../dependencyInjection/DI'
import {idValidation} from "../middlewares/express-validator/idValidation";
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import {addCategoryValidation, updateCategoryValidation} from "../middlewares/express-validator/categoryValidator"
import { CategoryController } from '../controllers/CategoryController';

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory} = container.get<CategoryController>('CategoryController');

const categoryRouter = express.Router();

categoryRouter.route("/get")
	.post(isAuthenticated, isAuthorized('Category', 'GET'), getAllCategories);

categoryRouter.route("/get/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Category', 'GET'), getCategoryById);

categoryRouter.route("/add")
	.post(isAuthenticated, isAuthorized('Category', 'POST'), addCategoryValidation, createCategory);

categoryRouter.route("/update/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Category', 'PATCH'), updateCategoryValidation, updateCategory);

categoryRouter.route("/delete/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Category', 'DELETE'), deleteCategory);

export default categoryRouter;