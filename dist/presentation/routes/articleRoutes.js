"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const articleValidator_1 = require("../middlewares/express-validator/articleValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } = DI_1.default.get('ArticleController');
const articleRouter = express_1.default.Router();
articleRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Article', 'GET'), getAllArticles);
articleRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Article', 'GET'), getArticleById);
articleRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Article', 'POST'), articleValidator_1.addArticleValidation, createArticle);
articleRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Article', 'PATCH'), articleValidator_1.updateArticleValidation, updateArticle);
articleRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Article', 'DELETE'), deleteArticle);
exports.default = articleRouter;
//# sourceMappingURL=articleRoutes.js.map