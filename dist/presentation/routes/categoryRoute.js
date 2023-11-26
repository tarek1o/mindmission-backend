"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const categoryValidator_1 = require("../middlewares/express-validator/categoryValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = DI_1.default.get('CategoryController');
const categoryRouter = express_1.default.Router();
categoryRouter.route("/")
    .put(isAuthenticated, isAuthorized('Category'), getAllCategories)
    .post(isAuthenticated, isAuthorized('Category'), categoryValidator_1.addCategoryValidation, createCategory);
categoryRouter.route("/:id")
    .put(idValidation_1.idValidation, isAuthenticated, isAuthorized('Category'), getCategoryById)
    .patch(idValidation_1.idValidation, isAuthenticated, isAuthorized('Category'), categoryValidator_1.updateCategoryValidation, updateCategory)
    .delete(idValidation_1.idValidation, isAuthenticated, isAuthorized('Category'), deleteCategory);
exports.default = categoryRouter;
//# sourceMappingURL=categoryRoute.js.map