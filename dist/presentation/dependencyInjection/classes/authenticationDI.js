"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const AuthenticationController_1 = require("../../controllers/AuthenticationController");
DIContainer_1.container.bind('AuthenticationController').to(AuthenticationController_1.AuthenticationController).inSingletonScope();
//# sourceMappingURL=authenticationDI.js.map