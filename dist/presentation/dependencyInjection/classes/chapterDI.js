"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const ChapterRepository_1 = require("../../../infrastructure/repositories/ChapterRepository");
const ChapterService_1 = require("../../../application/services/ChapterService");
const ChapterController_1 = require("../../controllers/ChapterController");
DIContainer_1.container.bind('IChapterRepository').to(ChapterRepository_1.ChapterRepository).inRequestScope();
DIContainer_1.container.bind('IChapterService').to(ChapterService_1.ChapterService).inRequestScope();
DIContainer_1.container.bind('ChapterController').to(ChapterController_1.ChapterController).inRequestScope();
//# sourceMappingURL=chapterDI.js.map