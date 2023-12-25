"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const studentValidator_1 = require("../middlewares/express-validator/studentValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllStudents, getStudentById, addToWishlist, removeFromWishlist, enroll, rate, enrollmentPayMobConfirmation, enrollmentPayPalConfirmation } = DI_1.default.get('StudentController');
const studentRouter = express_1.default.Router();
studentRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Student', 'GET'), getAllStudents);
studentRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Student', 'GET'), getStudentById);
studentRouter.route("/wishlist/add")
    .post(isAuthenticated, isAuthorized('Student', 'PATCH'), studentValidator_1.wishlistValidation, addToWishlist);
studentRouter.route("/wishlist/remove")
    .post(isAuthenticated, isAuthorized('Student', 'PATCH'), studentValidator_1.wishlistValidation, removeFromWishlist);
studentRouter.route("/enroll")
    .post(isAuthenticated, isAuthorized('Student', 'PATCH'), studentValidator_1.enrollValidation, enroll);
studentRouter.route("/paymob/confirm")
    .post(enrollmentPayMobConfirmation);
studentRouter.route("/paypal/confirm")
    .post(enrollmentPayPalConfirmation);
studentRouter.route("/rate")
    .post(isAuthenticated, isAuthorized('Student', 'PATCH'), studentValidator_1.rateValidation, rate);
exports.default = studentRouter;
//# sourceMappingURL=studentRoutes.js.map