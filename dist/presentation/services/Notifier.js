"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifier = void 0;
const socket_io_1 = require("socket.io");
const ServerCreator_1 = __importDefault(require("../config/ServerCreator"));
// class Notifier extends Server {
//   constructor(server: http.Server) {
//     super(server)
//   }
// }
exports.notifier = new socket_io_1.Server(ServerCreator_1.default);
//# sourceMappingURL=Notifier.js.map