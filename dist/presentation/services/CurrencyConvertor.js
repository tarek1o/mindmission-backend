"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
class CurrencyConvertor {
    static async convert(from, to) {
        const response = await fetch(`${CurrencyConvertor.URL}?base=${to}&symbols=${from}`, {
            method: 'GET',
            redirect: 'follow',
            headers: {
                apiKey: CurrencyConvertor.apiKey
            }
        });
        if (response.status !== HTTPStatusCode_1.default.OK) {
            throw new APIError_1.default('Currency Conversion Failed, please try again', HTTPStatusCode_1.default.InternalServerError);
        }
        const { rates } = await response.json();
        return +(rates[from].toFixed(2));
    }
}
CurrencyConvertor.URL = process.env.Exchangers_URL;
CurrencyConvertor.apiKey = process.env.Exchangers_Api_Key;
exports.default = CurrencyConvertor;
//# sourceMappingURL=CurrencyConvertor.js.map