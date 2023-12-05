import express from 'express';
import container from '../dependencyInjection/DI'
import {idValidation} from "../middlewares/express-validator/idValidation";
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import {addChapterValidation, updateChapterValidation} from "../middlewares/express-validator/chapterValidator"
import { ChapterController } from '../controllers/ChapterController';

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllChapters, getChapterById, createChapter, updateChapter, deleteChapter} = container.get<ChapterController>('ChapterController');

const chapterRouter = express.Router();

chapterRouter.route("/get")
	.post(isAuthenticated, isAuthorized('Chapter', 'GET'), getAllChapters);

chapterRouter.route("/get/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Chapter', 'GET'), getChapterById);

chapterRouter.route("/add")
	.post(isAuthenticated, isAuthorized('Chapter', 'POST'), addChapterValidation, createChapter);

chapterRouter.route("/update/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Chapter', 'PATCH'), updateChapterValidation, updateChapter);

chapterRouter.route("/delete/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Chapter', 'DELETE'), deleteChapter);

export default chapterRouter;