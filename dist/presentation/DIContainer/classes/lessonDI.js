"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const LessonRepository_1 = require("../../../infrastructure/repositories/LessonRepository");
const LessonService_1 = require("../../../application/services/LessonService");
const LessonController_1 = require("../../controllers/LessonController");
DIContainer_1.container.bind('ILessonRepository').to(LessonRepository_1.LessonRepository).inSingletonScope();
DIContainer_1.container.bind('ILessonService').to(LessonService_1.LessonService).inSingletonScope();
DIContainer_1.container.bind('LessonController').to(LessonController_1.LessonController).inSingletonScope();
//# sourceMappingURL=lessonDI.js.map