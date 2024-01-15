"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const OnlineUserRepository_1 = require("../../../infrastructure/repositories/OnlineUserRepository");
const OnlineUserService_1 = require("../../../application/services/OnlineUserService");
DIContainer_1.container.bind('IOnlineUserRepository').to(OnlineUserRepository_1.OnlineUserRepository).inSingletonScope();
DIContainer_1.container.bind('IOnlineUserService').to(OnlineUserService_1.OnlineUserService).inSingletonScope();
//# sourceMappingURL=onlineUserDI.js.map