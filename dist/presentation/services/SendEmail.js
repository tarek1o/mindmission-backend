"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
class SendEmail {
}
exports.SendEmail = SendEmail;
_a = SendEmail;
SendEmail.host = process.env.host;
SendEmail.secure = true;
SendEmail.sender = process.env.auth_user;
SendEmail.password = process.env.auth_pass;
SendEmail.send = async (emailContent) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: _a.host,
            secure: _a.secure,
            port: _a.secure ? 465 : 587,
            auth: {
                user: _a.sender,
                pass: _a.password
            },
        });
        const mailOptions = {
            from: `${process.env.APP_Name} <${_a.sender}>`,
            to: emailContent.to,
            subject: emailContent.subject,
            html: emailContent.message
        };
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        throw new APIError_1.default('Something wrong is happened', HTTPStatusCode_1.default.InternalServerError);
    }
};
//# sourceMappingURL=SendEmail.js.map