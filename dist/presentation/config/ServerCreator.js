"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Express_1 = __importDefault(require("./Express"));
const db_1 = __importDefault(require("../../domain/db"));
class ServerCreator {
}
_a = ServerCreator;
ServerCreator.port = process.env.PORT || 8080;
ServerCreator.create = (app) => app.listen(_a.port, async () => {
    await db_1.default.$connect();
    console.log(`App is running at: http://localhost:${_a.port} 🚀`);
});
;
const server = ServerCreator.create(Express_1.default);
exports.default = server;
//# sourceMappingURL=ServerCreator.js.map