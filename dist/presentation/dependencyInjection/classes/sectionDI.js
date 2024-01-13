"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const SectionRepository_1 = require("../../../infrastructure/repositories/SectionRepository");
const SectionService_1 = require("../../../application/services/SectionService");
const SectionController_1 = require("../../controllers/SectionController");
DIContainer_1.container.bind('ISectionRepository').to(SectionRepository_1.SectionRepository).inRequestScope();
DIContainer_1.container.bind('ISectionService').to(SectionService_1.SectionService).inRequestScope();
DIContainer_1.container.bind('SectionController').to(SectionController_1.SectionController).inRequestScope();
//# sourceMappingURL=sectionDI.js.map