"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const ArticleRepository_1 = require("../../../infrastructure/repositories/ArticleRepository");
const ArticleService_1 = require("../../../application/services/ArticleService");
const ArticleController_1 = require("../../controllers/ArticleController");
DIContainer_1.container.bind('IArticleRepository').to(ArticleRepository_1.ArticleRepository).inSingletonScope();
DIContainer_1.container.bind('IArticleService').to(ArticleService_1.ArticleService).inSingletonScope();
DIContainer_1.container.bind('ArticleController').to(ArticleController_1.ArticleController).inSingletonScope();
//# sourceMappingURL=articleDI.js.map