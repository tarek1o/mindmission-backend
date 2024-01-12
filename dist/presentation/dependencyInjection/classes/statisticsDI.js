"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const StatisticsController_1 = require("../../controllers/StatisticsController");
DIContainer_1.container.bind('StatisticsController').to(StatisticsController_1.StatisticsController).inRequestScope();
//# sourceMappingURL=statisticsDI.js.map