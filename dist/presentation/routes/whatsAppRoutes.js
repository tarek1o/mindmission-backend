"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const whatsAppController_1 = require("../controllers/whatsAppController");
const userRouter = express_1.default.Router();
userRouter.route("/scan")
    .post(whatsAppController_1.connect);
userRouter.route("/scan")
    .post(whatsAppController_1.sendMessageByWhatsApp);
exports.default = userRouter;
//# sourceMappingURL=whatsAppRoutes.js.map