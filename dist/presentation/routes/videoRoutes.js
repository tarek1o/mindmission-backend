"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const videoValidator_1 = require("../middlewares/express-validator/videoValidator");
const multer_1 = __importDefault(require("multer"));
const VideoUploader_1 = require("../services/VideoUploader");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllVideos, getVideoById, createVideo, updateVideo, deleteVideo } = DI_1.default.get('VideoController');
const { upload } = new VideoUploader_1.VideoUploader();
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
const storage = multer_1.default.memoryStorage();
const multerUpload = (0, multer_1.default)({ storage });
videoRouter.route('/upload')
    .post(multerUpload.single('video'), upload);
exports.default = videoRouter;
//# sourceMappingURL=videoRoutes.js.map