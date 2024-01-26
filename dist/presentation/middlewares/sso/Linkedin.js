"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linkedin = void 0;
const crypto_1 = __importDefault(require("crypto"));
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const OAuth_1 = require("../../services/OAuth");
class Linkedin extends OAuth_1.OAuth {
    constructor() {
        super('LINKEDIN');
        this.signup = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { code, redirectURL } = request.body.input;
            const userData = await this.getData(code, redirectURL);
            delete request.body.input.code;
            delete request.body.input.redirectURL;
            request.body.input = Object.assign(Object.assign({}, request.body.input), { firstName: userData.given_name, lastName: userData.family_name, email: userData.email, password: crypto_1.default.randomUUID(), picture: userData.picture, isSignWithSSO: true, platform: client_1.SSOPlatform.LINKEDIN, isEmailVerified: userData.email_verified });
            next();
        });
        this.login = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { code, redirectURL } = request.body.input;
            const userData = await this.getData(code, redirectURL);
            delete request.body.input.code;
            delete request.body.input.redirectURL;
            request.body.input = Object.assign(Object.assign({}, request.body.input), { email: userData.email, password: crypto_1.default.randomUUID(), isSignWithSSO: true, platform: client_1.SSOPlatform.LINKEDIN });
            next();
        });
        this.platformInfo = {
            clientId: process.env.Linkedin_Client_Id,
            clientSecret: process.env.Linkedin_Client_Secret,
            tokenURL: process.env.Linkedin_Token_Url,
            scopeURL: process.env.Linkedin_Scope_URL
        };
    }
    ;
}
exports.Linkedin = Linkedin;
//# sourceMappingURL=Linkedin.js.map