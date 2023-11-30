"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const CourseRepository_1 = require("../../../infrastructure/repositories/CourseRepository");
const CourseService_1 = require("../../../application/services/CourseService");
const CourseController_1 = require("../../controllers/CourseController");
DIContainer_1.container.bind('ICourseRepository').to(CourseRepository_1.CourseRepository).inRequestScope();
DIContainer_1.container.bind('ICourseService').to(CourseService_1.CourseService).inRequestScope();
DIContainer_1.container.bind('CourseController').to(CourseController_1.CourseController).inRequestScope();
//# sourceMappingURL=courseDI.js.map