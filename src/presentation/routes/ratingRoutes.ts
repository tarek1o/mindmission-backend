import express from 'express';
import container from '../dependencyInjection/DI'
import {idValidation} from "../middlewares/express-validator/idValidation";
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import {RatingController} from '../controllers/RatingController';

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllRatings, getRatingById, deleteRating} = container.get<RatingController>('RatingController');

const ratingRouter = express.Router();

ratingRouter.route("/get")
	.post(isAuthenticated, isAuthorized('Rating', 'GET'), getAllRatings);

ratingRouter.route("/get/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Rating', 'GET'), getRatingById);

ratingRouter.route("/delete/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Rating', 'DELETE'), deleteRating);

export default ratingRouter;