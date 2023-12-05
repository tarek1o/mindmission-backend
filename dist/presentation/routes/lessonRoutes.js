"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const lessonValidator_1 = require("../middlewares/express-validator/lessonValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllLessons, getLessonById, createLesson, updateLesson, deleteLesson } = DI_1.default.get('LessonController');
const lessonRouter = express_1.default.Router();
lessonRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Lesson', 'GET'), getAllLessons);
lessonRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Lesson', 'GET'), getLessonById);
lessonRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Lesson', 'POST'), lessonValidator_1.addLessonValidation, createLesson);
lessonRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Lesson', 'PATCH'), lessonValidator_1.updateLessonValidation, updateLesson);
lessonRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Lesson', 'DELETE'), deleteLesson);
exports.default = lessonRouter;
//# sourceMappingURL=lessonRoutes.js.map