"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const roleValidator_1 = require("../middlewares/express-validator/roleValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllRoles, getRoleById, createRole, updateRole, deleteRole } = DI_1.default.get('RoleController');
const roleRouter = express_1.default.Router();
roleRouter.route("/")
    .put(isAuthenticated, isAuthorized('Role'), getAllRoles)
    .post(isAuthenticated, isAuthorized('Role'), roleValidator_1.addRoleValidation, createRole);
roleRouter.route("/:id")
    .put(idValidation_1.idValidation, isAuthenticated, isAuthorized('Role'), getRoleById)
    .patch(idValidation_1.idValidation, isAuthenticated, isAuthorized('Role'), roleValidator_1.updateRoleValidation, updateRole)
    .delete(idValidation_1.idValidation, isAuthenticated, isAuthorized('Role'), deleteRole);
exports.default = roleRouter;
//# sourceMappingURL=roleRoute.js.map