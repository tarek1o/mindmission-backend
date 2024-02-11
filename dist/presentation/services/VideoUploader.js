"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoUploader = void 0;
const vimeo_1 = require("vimeo");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class VideoUploader {
    constructor() {
        this.client = new vimeo_1.Vimeo(process.env.Vimeo_Client_Id, process.env.Vimeo_Client_Secret, process.env.Vimeo_Access_Token);
        this.upload = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { size } = request.body.input;
            const res = await fetch('https://api.vimeo.com/me/videos', {
                method: 'POST',
                headers: {
                    Accept: 'application/vnd.vimeo.*+json;version=3.4',
                    Authorization: `bearer ${process.env.Vimeo_Access_Token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    upload: {
                        approach: 'tus',
                        size,
                    }
                })
            });
            const data = await res.json();
            response.json({ success: true, data });
        });
    }
}
exports.VideoUploader = VideoUploader;
//# sourceMappingURL=VideoUploader.js.map