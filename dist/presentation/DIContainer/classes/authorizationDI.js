"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const AuthorizationValidator_1 = require("../../middlewares/authorization-validator/AuthorizationValidator");
DIContainer_1.container.bind('Authorization').to(AuthorizationValidator_1.Authorization).inSingletonScope();
//# sourceMappingURL=authorizationDI.js.map