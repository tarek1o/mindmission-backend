"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("./container/DIContainer");
require("./classes/userDI");
require("./classes/roleDI");
require("./classes/authenticationDI");
require("./classes/authorizationDI");
require("./classes/logDI");
require("./classes/categoryDI");
exports.default = DIContainer_1.container;
//# sourceMappingURL=DI.js.map