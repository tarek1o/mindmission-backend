"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const UserRepository_1 = require("../../../infrastructure/repositories/UserRepository");
const UserService_1 = require("../../../application/services/UserService");
const UserController_1 = require("../../controllers/UserController");
DIContainer_1.container.bind('IUserRepository').to(UserRepository_1.UserRepository).inSingletonScope();
DIContainer_1.container.bind('IUserService').to(UserService_1.UserService).inSingletonScope();
DIContainer_1.container.bind('UserController').to(UserController_1.UserController).inSingletonScope();
//# sourceMappingURL=userDI.js.map