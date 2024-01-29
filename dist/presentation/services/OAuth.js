"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth = void 0;
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
class OAuth {
    constructor() { }
    async getData(code, redirectURL) {
        const access_token = await this.getAccessToken(code, redirectURL);
        const response = await fetch(this.platformInfo.scopeURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        });
        if (response.status !== 200) {
            const error = await response.json();
            throw new APIError_1.default(`${error.error}, ${error.error_description}`, HTTPStatusCode_1.default.InternalServerError);
        }
        return await response.json();
    }
    ;
}
exports.OAuth = OAuth;
;
//# sourceMappingURL=OAuth.js.map