"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const RoleRepository_1 = require("../../../infrastructure/repositories/RoleRepository");
const RoleService_1 = require("../../../application/services/RoleService");
const RoleController_1 = require("../../controllers/RoleController");
DIContainer_1.container.bind('IRoleRepository').to(RoleRepository_1.RoleRepository).inSingletonScope();
DIContainer_1.container.bind('IRoleService').to(RoleService_1.RoleService).inSingletonScope();
DIContainer_1.container.bind('RoleController').to(RoleController_1.RoleController).inSingletonScope();
//# sourceMappingURL=roleDI.js.map