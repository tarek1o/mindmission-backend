"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WhatsAppController_1 = require("../controllers/WhatsAppController");
const whatsAppRouter = express_1.default.Router();
whatsAppRouter.route("/scan")
    .post(WhatsAppController_1.connect);
whatsAppRouter.route("/scan")
    .post(WhatsAppController_1.sendMessageByWhatsApp);
exports.default = whatsAppRouter;
//# sourceMappingURL=whatsAppRoutes.js.map