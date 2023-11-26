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
roleRouter.route("/")
    .put(isAuthenticated, isAuthorized('Log'), getAllLogs);
roleRouter.route("/:id")
    .put(idValidation_1.idValidation, isAuthenticated, isAuthorized('Log'), getLogById);
exports.default = roleRouter;
//# sourceMappingURL=logRoute.js.map