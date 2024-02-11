"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const signalr_1 = __importDefault(require("@microsoft/signalr"));
exports.connection = new signalr_1.default.HubConnectionBuilder().withUrl('/realtime').build();
exports.connection.start().then(() => exports.connection.invoke("send", "Hello"));
exports.connection.on("send", data => {
    console.log(data);
});
//# sourceMappingURL=SignalR.js.map