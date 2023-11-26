"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendImageMessage = exports.sendTextMessage = exports.login = void 0;
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const establishWhatsAppConnection = async () => {
    const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)('../Tabeeb');
    const client = (0, baileys_1.default)({
        printQRInTerminal: true,
        auth: state,
        browser: ['Tabeeb', 'Chrome', 'Firefox'],
    });
    client.ev.on('creds.update', saveCreds);
    return client;
};
const login = async () => {
    const client = await establishWhatsAppConnection();
    client.ev.on('connection.update', async (update) => {
        var _a, _b;
        const { connection, lastDisconnect, qr } = update;
        if (connection === 'close') {
            const shouldReconnect = ((_b = (_a = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== baileys_1.DisconnectReason.loggedOut;
            if (shouldReconnect) {
                (0, exports.login)();
            }
        }
    });
};
exports.login = login;
const logout = async () => {
};
const sendMessage = async (phone, content) => {
    const client = await establishWhatsAppConnection();
    client.ev.on('connection.update', async (update) => {
        var _a, _b;
        const { connection, lastDisconnect, qr } = update;
        if (connection === 'close') {
            const shouldReconnect = ((_b = (_a = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== baileys_1.DisconnectReason.loggedOut;
            if (shouldReconnect) {
                sendMessage(phone, content);
            }
        }
        else if (connection === 'open') {
            await client.sendMessage(`2${phone}@s.whatsapp.net`, content);
        }
    });
};
const sendTextMessage = async (phone, message) => {
    await sendMessage(phone, { text: message });
};
exports.sendTextMessage = sendTextMessage;
const sendImageMessage = async (phone, image, caption) => {
    await sendMessage(phone, {
        image: {
            url: image
        },
        caption
    });
};
exports.sendImageMessage = sendImageMessage;
//# sourceMappingURL=whatsAppService.js.map