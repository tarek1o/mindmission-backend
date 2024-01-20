"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const quizValidator_1 = require("../middlewares/express-validator/quizValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz } = DI_1.default.get('QuizController');
const quizRouter = express_1.default.Router();
quizRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Quiz', 'GET'), getAllQuizzes);
quizRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Quiz', 'GET'), getQuizById);
quizRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Quiz', 'POST'), quizValidator_1.addQuizValidation, createQuiz);
quizRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Quiz', 'PATCH'), quizValidator_1.updateQuizValidation, updateQuiz);
quizRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Quiz', 'DELETE'), deleteQuiz);
exports.default = quizRouter;
//# sourceMappingURL=quizRoutes.js.map