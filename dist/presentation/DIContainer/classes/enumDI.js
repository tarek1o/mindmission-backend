"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const EnumController_1 = require("../../controllers/EnumController");
DIContainer_1.container.bind('EnumController').to(EnumController_1.EnumController).inSingletonScope();
//# sourceMappingURL=enumDI.js.map