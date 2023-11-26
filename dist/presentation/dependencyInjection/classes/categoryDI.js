"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const CategoryRepository_1 = require("../../../infrastructure/repositories/CategoryRepository");
const CategoryService_1 = require("../../../application/services/CategoryService");
const CategoryController_1 = require("../../controllers/CategoryController");
DIContainer_1.container.bind('ICategoryRepository').to(CategoryRepository_1.CategoryRepository).inRequestScope();
DIContainer_1.container.bind('ICategoryService').to(CategoryService_1.CategoryService).inRequestScope();
DIContainer_1.container.bind('CategoryController').to(CategoryController_1.CategoryController).inRequestScope();
//# sourceMappingURL=categoryDI.js.map