"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const commentValidator_1 = require("../middlewares/express-validator/commentValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllComments, getCommentById, createComment, updateComment, deleteComment } = DI_1.default.get('CommentController');
const CommentRouter = express_1.default.Router();
CommentRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Comment', 'GET'), getAllComments);
CommentRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Comment', 'GET'), getCommentById);
CommentRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Comment', 'POST'), commentValidator_1.addCommentValidation, createComment);
CommentRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Comment', 'PATCH'), commentValidator_1.updateCommentValidation, updateComment);
CommentRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Comment', 'DELETE'), deleteComment);
exports.default = CommentRouter;
//# sourceMappingURL=commentRoutes.js.map