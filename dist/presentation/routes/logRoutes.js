"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllLogs, getLogById } = DI_1.default.get('LogController');
const roleRouter = express_1.default.Router();
roleRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Log', 'GET'), getAllLogs);
roleRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Log', 'GET'), getLogById);
exports.default = roleRouter;
//# sourceMappingURL=logRoutes.js.map