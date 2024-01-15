"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const InstructorRepository_1 = require("../../../infrastructure/repositories/InstructorRepository");
const InstructorService_1 = require("../../../application/services/InstructorService");
const InstructorController_1 = require("../../controllers/InstructorController");
DIContainer_1.container.bind('IInstructorRepository').to(InstructorRepository_1.InstructorRepository).inSingletonScope();
DIContainer_1.container.bind('IInstructorService').to(InstructorService_1.InstructorService).inSingletonScope();
DIContainer_1.container.bind('InstructorController').to(InstructorController_1.InstructorController).inSingletonScope();
//# sourceMappingURL=instructorDI.js.map