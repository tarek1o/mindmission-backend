"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const roleValidator_1 = require("../middlewares/express-validator/roleValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllRoles, getRoleById, createRole, updateRole, deleteRole } = DI_1.default.get('RoleController');
const roleRouter = express_1.default.Router();
roleRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Role', 'GET'), getAllRoles);
roleRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Role', 'GET'), getRoleById);
roleRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Role', 'POST'), roleValidator_1.addRoleValidation, createRole);
roleRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Role', 'PATCH'), roleValidator_1.updateRoleValidation, updateRole);
roleRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Role', 'DELETE'), deleteRole);
exports.default = roleRouter;
//# sourceMappingURL=roleRoutes.js.map