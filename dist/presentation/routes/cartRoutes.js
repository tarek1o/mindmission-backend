"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const cartValidator_1 = require("../middlewares/express-validator/cartValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllCarts, getCartById, upsertCart } = DI_1.default.get('CartController');
const cartRouter = express_1.default.Router();
cartRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Cart', 'GET'), getAllCarts);
cartRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Cart', 'GET'), getCartById);
cartRouter.route("/upsert")
    .post(isAuthenticated, isAuthorized('Cart', 'PATCH'), cartValidator_1.upsertCartValidation, upsertCart);
exports.default = cartRouter;
//# sourceMappingURL=cartRoutes.js.map