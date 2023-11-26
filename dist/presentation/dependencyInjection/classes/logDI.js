"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const LogRepository_1 = require("../../../infrastructure/repositories/LogRepository");
const LogService_1 = require("../../../application/services/LogService");
const LogController_1 = require("../../controllers/LogController");
DIContainer_1.container.bind('ILogRepository').to(LogRepository_1.LogRepository).inRequestScope();
DIContainer_1.container.bind('ILogService').to(LogService_1.LogService).inRequestScope();
DIContainer_1.container.bind('LogController').to(LogController_1.LogController).inRequestScope();
//# sourceMappingURL=logDI.js.map