"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../domain/db"));
class UnhandledRejectionHandler {
}
_a = UnhandledRejectionHandler;
UnhandledRejectionHandler.catchError = (server) => process.on('unhandledRejection', async (error) => {
    console.error(`Unhandled Rejection Errors: ${error}`);
    await db_1.default.$disconnect();
    server.close(() => {
        console.error('Shutting down....');
        process.exit(1);
    });
});
exports.default = UnhandledRejectionHandler;
//# sourceMappingURL=UnhandledRejectionHandler.js.map