"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const couponValidator_1 = require("../middlewares/express-validator/couponValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllCoupons, getCouponById, createCoupon, updateCoupon, deleteCoupon } = DI_1.default.get('CouponController');
const CouponRouter = express_1.default.Router();
CouponRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Coupon', 'GET'), getAllCoupons);
CouponRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Coupon', 'GET'), getCouponById);
CouponRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Coupon', 'POST'), couponValidator_1.addCouponValidation, createCoupon);
CouponRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Coupon', 'PATCH'), couponValidator_1.updateCouponValidation, updateCoupon);
CouponRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Coupon', 'DELETE'), deleteCoupon);
exports.default = CouponRouter;
//# sourceMappingURL=couponRoutes.js.map