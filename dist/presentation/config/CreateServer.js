"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class CreateServer {
}
_a = CreateServer;
CreateServer.PORT = process.env.PORT || 8080;
CreateServer.create = (app) => app.listen(_a.PORT, async () => {
    console.log(`App is running at: ${process.env.baseURL}:${_a.PORT} 🚀`);
});
exports.default = CreateServer;
//# sourceMappingURL=CreateServer.js.map