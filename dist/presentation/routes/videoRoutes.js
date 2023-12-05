"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const videoValidator_1 = require("../middlewares/express-validator/videoValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllVideos, getVideoById, createVideo, updateVideo, deleteVideo } = DI_1.default.get('VideoController');
const videoRouter = express_1.default.Router();
videoRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Video', 'GET'), getAllVideos);
videoRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Video', 'GET'), getVideoById);
videoRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Video', 'POST'), videoValidator_1.addVideoValidation, createVideo);
videoRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Video', 'PATCH'), videoValidator_1.updateVideoValidation, updateVideo);
videoRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Video', 'DELETE'), deleteVideo);
exports.default = videoRouter;
//# sourceMappingURL=videoRoutes.js.map