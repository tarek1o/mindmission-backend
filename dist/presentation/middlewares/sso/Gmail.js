"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gmail = void 0;
const crypto_1 = __importDefault(require("crypto"));
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const OAuth_1 = require("../../services/OAuth");
const APIError_1 = __importDefault(require("../../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../enums/HTTPStatusCode"));
class Gmail extends OAuth_1.OAuth {
    constructor() {
        super();
        this.signup = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { code, redirectURL } = request.body.input;
            const userData = await this.getData(code, redirectURL);
            delete request.body.input.code;
            delete request.body.input.redirectURL;
            request.body.input = Object.assign(Object.assign({}, request.body.input), { firstName: userData.given_name, lastName: userData.family_name, email: userData.email, password: crypto_1.default.randomUUID(), picture: userData.picture, isSignWithSSO: true, platform: client_1.SSOPlatform.GMAIL, isEmailVerified: userData.verified_email });
            next();
        });
        this.login = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { code, redirectURL } = request.body.input;
            const userData = await this.getData(code, redirectURL);
            delete request.body.input.code;
            delete request.body.input.redirectURL;
            request.body.input = Object.assign(Object.assign({}, request.body.input), { email: userData.email, password: crypto_1.default.randomUUID(), isSignWithSSO: true, platform: client_1.SSOPlatform.GMAIL });
            next();
        });
        this.platformInfo = {
            clientId: process.env.Google_Client_Id,
            clientSecret: process.env.Google_Client_Secret,
            tokenURL: process.env.Google_Token_URL,
            scopeURL: process.env.Google_Scope_URL
        };
    }
    ;
    async getAccessToken(code, redirectURL) {
        const { clientId, clientSecret, tokenURL } = this.platformInfo;
        const response = await fetch(tokenURL, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code,
                redirect_uri: redirectURL,
                grant_type: "authorization_code"
            }),
        });
        if (response.status !== 200) {
            const error = await response.json();
            throw new APIError_1.default(`${error.error}, ${error.error_description}`, HTTPStatusCode_1.default.InternalServerError);
        }
        const { access_token } = await response.json();
        return access_token;
    }
    ;
}
exports.Gmail = Gmail;
//# sourceMappingURL=Gmail.js.map