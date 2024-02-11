"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const CommentRepository_1 = require("../../../infrastructure/repositories/CommentRepository");
const CommentService_1 = require("../../../application/services/CommentService");
const CommentController_1 = require("../../controllers/CommentController");
DIContainer_1.container.bind('ICommentRepository').to(CommentRepository_1.CommentRepository).inSingletonScope();
DIContainer_1.container.bind('ICommentService').to(CommentService_1.CommentService).inSingletonScope();
DIContainer_1.container.bind('CommentController').to(CommentController_1.CommentController).inSingletonScope();
//# sourceMappingURL=commentDI.js.map