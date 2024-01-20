"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const RatingRepository_1 = require("../../../infrastructure/repositories/RatingRepository");
const RatingService_1 = require("../../../application/services/RatingService");
const RatingController_1 = require("../../controllers/RatingController");
DIContainer_1.container.bind('IRatingRepository').to(RatingRepository_1.RatingRepository).inSingletonScope();
DIContainer_1.container.bind('IRatingService').to(RatingService_1.RatingService).inSingletonScope();
DIContainer_1.container.bind('RatingController').to(RatingController_1.RatingController).inSingletonScope();
//# sourceMappingURL=ratingDI.js.map