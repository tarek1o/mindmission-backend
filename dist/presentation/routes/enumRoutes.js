"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const { getAllEnums } = DI_1.default.get('EnumController');
const enumRouter = express_1.default.Router();
enumRouter.route("/get")
    .post(getAllEnums);
exports.default = enumRouter;
//# sourceMappingURL=enumRoutes.js.map