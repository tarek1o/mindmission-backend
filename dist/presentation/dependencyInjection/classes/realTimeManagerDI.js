"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const RealTimeManager_1 = require("../../services/RealTimeManager");
DIContainer_1.container.bind('RealTimeManager').to(RealTimeManager_1.RealTimeManager).inSingletonScope();
//# sourceMappingURL=realTimeManagerDI.js.map