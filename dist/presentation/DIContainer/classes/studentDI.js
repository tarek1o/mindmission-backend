"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const StudentRepository_1 = require("../../../infrastructure/repositories/StudentRepository");
const StudentService_1 = require("../../../application/services/StudentService");
const StudentController_1 = require("../../controllers/StudentController");
DIContainer_1.container.bind('IStudentRepository').to(StudentRepository_1.StudentRepository).inSingletonScope();
DIContainer_1.container.bind('IStudentService').to(StudentService_1.StudentService).inSingletonScope();
DIContainer_1.container.bind('StudentController').to(StudentController_1.StudentController).inSingletonScope();
//# sourceMappingURL=studentDI.js.map