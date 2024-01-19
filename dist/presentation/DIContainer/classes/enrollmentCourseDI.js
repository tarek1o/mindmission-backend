"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const EnrollmentRepository_1 = require("../../../infrastructure/repositories/EnrollmentRepository");
const EnrollmentService_1 = require("../../../application/services/EnrollmentService");
const EnrollmentController_1 = require("../../controllers/EnrollmentController");
DIContainer_1.container.bind('IEnrollmentRepository').to(EnrollmentRepository_1.EnrollmentRepository).inSingletonScope();
DIContainer_1.container.bind('IEnrollmentService').to(EnrollmentService_1.EnrollmentService).inSingletonScope();
DIContainer_1.container.bind('EnrollmentController').to(EnrollmentController_1.EnrollmentController).inSingletonScope();
//# sourceMappingURL=enrollmentCourseDI.js.map