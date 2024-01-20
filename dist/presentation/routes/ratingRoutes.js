"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const ratingValidator_1 = require("../middlewares/express-validator/ratingValidator");
const { isAuthenticated, isAuthorized, isCurrentUserRoleInWhiteList } = DI_1.default.get('Authorization');
const { getAllRatings, getRatingById, upsertRating, deleteRating } = DI_1.default.get('RatingController');
const ratingRouter = express_1.default.Router();
ratingRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Rating', 'GET'), getAllRatings);
ratingRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Rating', 'GET'), getRatingById);
ratingRouter.route('/upsert')
    .post(isAuthenticated, isAuthorized('Rating', 'POST'), isCurrentUserRoleInWhiteList('student'), ratingValidator_1.upsertRatingValidation, upsertRating);
ratingRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Rating', 'DELETE'), deleteRating);
exports.default = ratingRouter;
//# sourceMappingURL=ratingRoutes.js.map