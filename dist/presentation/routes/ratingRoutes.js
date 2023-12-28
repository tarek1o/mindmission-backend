"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllRatings, getRatingById, deleteRating } = DI_1.default.get('RatingController');
const ratingRouter = express_1.default.Router();
ratingRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Rating', 'GET'), getAllRatings);
ratingRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Rating', 'GET'), getRatingById);
ratingRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Rating', 'DELETE'), deleteRating);
exports.default = ratingRouter;
//# sourceMappingURL=ratingRoutes.js.map