"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTGenerator {
}
exports.JWTGenerator = JWTGenerator;
_a = JWTGenerator;
JWTGenerator.accessTokenSecretKey = process.env.JWT_Access_Token_Secret_Key || '';
JWTGenerator.refreshTokenSecretKey = process.env.JWT_Refresh_Token_Secret_Key || '';
JWTGenerator.generateAccessToken = (user) => {
    const { firstName, lastName, email, picture } = user;
    return jsonwebtoken_1.default.sign({ firstName, lastName, email, picture }, _a.accessTokenSecretKey, { expiresIn: "3d" });
};
JWTGenerator.generateRefreshToken = (user) => {
    const { firstName, lastName, email, picture } = user;
    return jsonwebtoken_1.default.sign({ firstName, lastName, email, picture }, _a.refreshTokenSecretKey, { expiresIn: "30d" });
};
JWTGenerator.decode = (token) => {
    return jsonwebtoken_1.default.decode(token);
};
JWTGenerator.verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, _a.accessTokenSecretKey);
};
JWTGenerator.verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, _a.refreshTokenSecretKey);
};
JWTGenerator.isTokenExpired = (token) => {
    const { exp } = _a.decode(token);
    if (exp) {
        if (exp < Math.floor(Date.now() / 1000)) {
            return true;
        }
    }
    return false;
};
//# sourceMappingURL=JWTGenerator.js.map