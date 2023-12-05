"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const chapterValidator_1 = require("../middlewares/express-validator/chapterValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllChapters, getChapterById, createChapter, updateChapter, deleteChapter } = DI_1.default.get('ChapterController');
const chapterRouter = express_1.default.Router();
chapterRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Chapter', 'GET'), getAllChapters);
chapterRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Chapter', 'GET'), getChapterById);
chapterRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Chapter', 'POST'), chapterValidator_1.addChapterValidation, createChapter);
chapterRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Chapter', 'PATCH'), chapterValidator_1.updateChapterValidation, updateChapter);
chapterRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Chapter', 'DELETE'), deleteChapter);
exports.default = chapterRouter;
//# sourceMappingURL=chapterRoutes.js.map