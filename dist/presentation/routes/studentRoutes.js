"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllStudents, getStudentById, addToWishlist, removeFromWishlist } = DI_1.default.get('StudentController');
const roleRouter = express_1.default.Router();
roleRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Student', 'GET'), getAllStudents);
roleRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Student', 'GET'), getStudentById);
exports.default = roleRouter;
//# sourceMappingURL=studentRoutes.js.map