import express from 'express';
import container from '../dependencyInjection/DI'
import {idValidation} from "../middlewares/express-validator/idValidation";
import {wishlistValidation, enrollValidation, rateValidation} from "../middlewares/express-validator/studentValidator";
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import { StudentController } from '../controllers/StudentController';

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllStudents, getStudentById, addToWishlist, removeFromWishlist, enroll, rate, enrollmentPayMobConfirmation, enrollmentPayPalConfirmation} = container.get<StudentController>('StudentController');

const studentRouter = express.Router();

studentRouter.route("/get")
	.post(isAuthenticated, isAuthorized('Student', 'GET'), getAllStudents);

studentRouter.route("/get/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Student', 'GET'), getStudentById);

studentRouter.route("/wishlist/add")
	.post(isAuthenticated, isAuthorized('Student', 'PATCH'), wishlistValidation, addToWishlist);

studentRouter.route("/wishlist/remove")
	.post(isAuthenticated, isAuthorized('Student', 'PATCH'), wishlistValidation, removeFromWishlist);

studentRouter.route("/enroll")
	.post(isAuthenticated, isAuthorized('Student', 'PATCH'), enrollValidation, enroll);

studentRouter.route("/paymob/confirm")
	.post(enrollmentPayMobConfirmation);

studentRouter.route("/paypal/confirm")
	.post(enrollmentPayPalConfirmation);

studentRouter.route("/rate")
	.post(isAuthenticated, isAuthorized('Student', 'PATCH'), rateValidation, rate);

export default studentRouter;