"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Express_1 = __importDefault(require("./Express"));
class ServerCreator {
}
_a = ServerCreator;
ServerCreator.PORT = process.env.PORT || 8080;
ServerCreator.create = (app) => app.listen(_a.PORT, async () => {
    console.log(`App is running at: ${process.env.baseURL}:${_a.PORT} 🚀`);
});
;
const server = ServerCreator.create(Express_1.default);
exports.default = server;
//# sourceMappingURL=ServerCreator.js.map