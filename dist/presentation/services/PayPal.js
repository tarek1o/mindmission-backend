"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const CurrencyConvertor_1 = __importDefault(require("./CurrencyConvertor"));
class PayPal {
    static async getAuthToken() {
        const auth = Buffer.from(`${PayPal.clientId}:${PayPal.secretKey}`).toString("base64");
        const response = await fetch(PayPal.tokenURL, {
            method: "POST",
            headers: {
                "Content-Type": " x-www-form-urlencoded",
                Authorization: `Basic ${auth}`,
            },
            body: "grant_type=client_credentials",
        });
        if (response.status !== HTTPStatusCode_1.default.OK) {
            throw new APIError_1.default('PayPal Error: something wrong during get auth token, please try again', HTTPStatusCode_1.default.InternalServerError);
        }
        const { access_token } = await response.json();
        return access_token;
    }
    ;
    static async createPaymentOrder(paymentId, totalPrice, currency, discount, orderItems) {
        const exchangeRate = await CurrencyConvertor_1.default.convert(currency, "EGP");
        const accessToken = await PayPal.getAuthToken();
        const response = await fetch(PayPal.orderURL, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: orderItems.map(({ id, price }) => {
                    return {
                        reference_id: id,
                        custom_id: `${paymentId}`,
                        amount: {
                            value: (price - price * (discount / 100)) * exchangeRate,
                            currency_code: currency,
                        },
                    };
                })
            })
        });
        if (response.status !== HTTPStatusCode_1.default.Created) {
            throw new APIError_1.default('PayPal Error: something wrong during create payment session', HTTPStatusCode_1.default.InternalServerError);
        }
        const { id } = await response.json();
        return id;
    }
    ;
    static async isValidRequest(request) {
        const response = await fetch(PayPal.webhookSignatureURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await PayPal.getAuthToken()}`
            },
            body: JSON.stringify({
                transmission_id: request.headers['paypal-transmission-id'],
                transmission_time: request.headers['paypal-transmission-time'],
                cert_url: request.headers['paypal-cert-url'],
                auth_algo: request.headers['paypal-auth-algo'],
                transmission_sig: request.headers['paypal-transmission-sig'],
                webhook_id: PayPal.webhookId,
                webhook_event: request.body
            })
        });
        const data = await response.json();
        if (data.verification_status === 'SUCCESS') {
            return true;
        }
        return false;
    }
    ;
    static getPaymentId(request) {
        const { custom_id } = request.body.resource.purchase_units[0];
        return +custom_id || 0;
    }
    ;
}
PayPal.tokenURL = process.env.PayPal_Token_URL;
PayPal.orderURL = process.env.PayPal_Order_URL;
PayPal.webhookSignatureURL = process.env.PayPal_Webhook_Signature_URL;
PayPal.webhookId = process.env.PayPal_Webhook_Id;
PayPal.clientId = process.env.PayPal_Client_Id;
PayPal.secretKey = process.env.PayPal_Secret_Key;
exports.default = PayPal;
//# sourceMappingURL=PayPal.js.map