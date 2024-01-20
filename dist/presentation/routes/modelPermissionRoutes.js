"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const ModelPermissionController_1 = require("../controllers/ModelPermissionController");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllModelPermissions } = new ModelPermissionController_1.ModelPermissionController();
const modelPermissionRouter = express_1.default.Router();
modelPermissionRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Role', 'GET'), getAllModelPermissions);
exports.default = modelPermissionRouter;
//# sourceMappingURL=modelPermissionRoutes.js.map