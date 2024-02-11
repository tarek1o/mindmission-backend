"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const categoryValidator_1 = require("../middlewares/express-validator/categoryValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getCategoryEnums, getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = DI_1.default.get('CategoryController');
const categoryRouter = express_1.default.Router();
categoryRouter.route("/enums")
    .post(getCategoryEnums);
categoryRouter.route("/get")
    .post(getAllCategories);
categoryRouter.route("/get/:id")
    .post(idValidation_1.idValidation, getCategoryById);
categoryRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Category', 'POST'), categoryValidator_1.addCategoryValidation, createCategory);
categoryRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Category', 'PATCH'), categoryValidator_1.updateCategoryValidation, updateCategory);
categoryRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Category', 'DELETE'), deleteCategory);
exports.default = categoryRouter;
//# sourceMappingURL=categoryRoutes.js.map