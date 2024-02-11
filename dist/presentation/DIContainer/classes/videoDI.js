"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const VideoRepository_1 = require("../../../infrastructure/repositories/VideoRepository");
const VideoService_1 = require("../../../application/services/VideoService");
const VideoController_1 = require("../../controllers/VideoController");
DIContainer_1.container.bind('IVideoRepository').to(VideoRepository_1.VideoRepository).inSingletonScope();
DIContainer_1.container.bind('IVideoService').to(VideoService_1.VideoService).inSingletonScope();
DIContainer_1.container.bind('VideoController').to(VideoController_1.VideoController).inSingletonScope();
//# sourceMappingURL=videoDI.js.map