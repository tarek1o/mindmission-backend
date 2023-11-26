import express from 'express';
import container from '../dependencyInjection/DI'
import {idValidation} from "../middlewares/express-validator/idValidation";
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import {addCategoryValidation, updateCategoryValidation} from "../middlewares/express-validator/categoryValidator"
import { CategoryController } from '../controllers/CategoryController';

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory} = container.get<CategoryController>('CategoryController');

const categoryRouter = express.Router();

categoryRouter.route("/")
	.put(isAuthenticated, isAuthorized('Category'), getAllCategories)
	.post(isAuthenticated, isAuthorized('Category'), addCategoryValidation, createCategory);

categoryRouter.route("/:id")
	.put(idValidation, isAuthenticated, isAuthorized('Category'), getCategoryById)
	.patch(idValidation, isAuthenticated, isAuthorized('Category'), updateCategoryValidation, updateCategory)
	.delete(idValidation, isAuthenticated, isAuthorized('Category'), deleteCategory)

export default categoryRouter;