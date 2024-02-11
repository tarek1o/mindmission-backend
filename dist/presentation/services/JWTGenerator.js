"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTGenerator {
    static generateAccessToken(user) {
        const { firstName, lastName, email, picture } = user;
        return jsonwebtoken_1.default.sign({ firstName, lastName, email, picture }, this.accessTokenSecretKey, { expiresIn: "3d" });
    }
    ;
    static generateRefreshToken(user) {
        const { firstName, lastName, email, picture } = user;
        return jsonwebtoken_1.default.sign({ firstName, lastName, email, picture }, this.refreshTokenSecretKey, { expiresIn: "30d" });
    }
    ;
    static generateEmailVerificationToken(user) {
        const { firstName, lastName, email, picture } = user;
        return jsonwebtoken_1.default.sign({ firstName, lastName, email, picture }, this.emailVerificationTokenSecretKey, { expiresIn: "10min" });
    }
    ;
    static verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, this.accessTokenSecretKey);
    }
    ;
    static verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, this.refreshTokenSecretKey);
    }
    ;
    static verifyEmailVerificationToken(token) {
        return jsonwebtoken_1.default.verify(token, this.emailVerificationTokenSecretKey);
    }
    static decode(token) {
        return jsonwebtoken_1.default.decode(token);
    }
    ;
    static isTokenExpired(token) {
        const { exp } = JWTGenerator.decode(token);
        if (exp) {
            if (exp < Math.floor(Date.now() / 1000)) {
                return true;
            }
        }
        return false;
    }
    ;
}
exports.JWTGenerator = JWTGenerator;
JWTGenerator.accessTokenSecretKey = process.env.JWT_Access_Token_Secret_Key;
JWTGenerator.refreshTokenSecretKey = process.env.JWT_Refresh_Token_Secret_Key;
JWTGenerator.emailVerificationTokenSecretKey = process.env.JWT_Email_Verification_Token_Secret_Key;
//# sourceMappingURL=JWTGenerator.js.map