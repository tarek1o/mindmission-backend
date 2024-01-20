"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const messageValidator_1 = require("../middlewares/express-validator/messageValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllMessages, getMessageById, createMessage, updateMessage, deleteMessage } = DI_1.default.get('MessageController');
const messageRouter = express_1.default.Router();
messageRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Message', 'GET'), getAllMessages);
messageRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Message', 'GET'), getMessageById);
messageRouter.route("/add")
    .post(messageValidator_1.addMessageValidation, createMessage);
messageRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Message', 'PATCH'), messageValidator_1.updateMessageValidation, updateMessage);
messageRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Message', 'DELETE'), deleteMessage);
exports.default = messageRouter;
//# sourceMappingURL=messageRoutes.js.map