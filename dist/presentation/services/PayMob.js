"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayMob = void 0;
const crypto_1 = __importDefault(require("crypto"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
class PayMob {
    static async getAuthToken() {
        const response = await fetch(PayMob.tokenURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                api_key: PayMob.APIKey
            })
        });
        if (response.status !== HTTPStatusCode_1.default.Created) {
            throw new APIError_1.default("PayMob error: something wrong during get auth token, please try again", HTTPStatusCode_1.default.InternalServerError);
        }
        const { token } = await response.json();
        return token;
    }
    ;
    static async getOrderId(token, paymentId, totalPrice, currency, orderItems) {
        const response = await fetch(PayMob.orderURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                auth_token: token,
                delivery_needed: "false",
                amount_cents: totalPrice,
                currency: currency,
                merchant_order_id: paymentId,
                items: orderItems.map(item => {
                    var _a, _b;
                    return {
                        name: ((_a = item.course) === null || _a === void 0 ? void 0 : _a.title) || "",
                        amount_cents: `${item.price * 100}`,
                        description: ((_b = item.course) === null || _b === void 0 ? void 0 : _b.description) || "",
                        quantity: 1
                    };
                }),
            })
        });
        if (response.status !== HTTPStatusCode_1.default.Created) {
            const error = await response.json();
            throw new APIError_1.default(`PayMob error: ${error.message}, please try again`, HTTPStatusCode_1.default.InternalServerError);
        }
        const { id } = await response.json();
        return id;
    }
    ;
    static async getPaymentToken(authToken, orderId, totalPrice, currency) {
        const response = await fetch(PayMob.paymentKeysURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                auth_token: authToken,
                amount_cents: totalPrice,
                expiration: 10 * 60, // 10 Min 
                order_id: orderId,
                currency: currency,
                integration_id: PayMob.integrationId,
                "billing_data": {
                    "apartment": "803",
                    "email": "claudette09@exa.com",
                    "floor": "42",
                    "first_name": "Clifford",
                    "street": "Ethan Land",
                    "building": "8028",
                    "phone_number": "+86(8)9135210487",
                    "shipping_method": "PKG",
                    "postal_code": "01898",
                    "city": "Jaskolskiburgh",
                    "country": "CR",
                    "last_name": "Nicolas",
                    "state": "Utah"
                },
            })
        });
        if (response.status !== HTTPStatusCode_1.default.Created) {
            const error = await response.json();
            throw new APIError_1.default(`PayMob error: ${error.message}, please try again`, HTTPStatusCode_1.default.InternalServerError);
        }
        const { token } = await response.json();
        return token;
    }
    ;
    static async createPaymentOrder(paymentId, totalPrice, currency, discount, orderItems) {
        const totalPriceInCents = (totalPrice - totalPrice * (discount / 100)) * 100;
        const token = await PayMob.getAuthToken();
        const orderId = await PayMob.getOrderId(token, paymentId, totalPriceInCents, currency, orderItems);
        return await PayMob.getPaymentToken(token, orderId, totalPriceInCents, currency);
    }
    ;
    static isValidRequest(request) {
        const { hmac } = request.query;
        const { id, pending, amount_cents, success, is_auth, is_capture, is_standalone_payment, is_voided, is_refunded, is_3d_secure, integration_id, has_parent_transaction, currency, created_at, error_occured, owner, order, source_data } = request.body.obj;
        const concatenatedString = [
            amount_cents,
            created_at,
            currency,
            error_occured,
            has_parent_transaction,
            id,
            integration_id,
            is_3d_secure,
            is_auth,
            is_capture,
            is_refunded,
            is_standalone_payment,
            is_voided,
            order.id,
            owner,
            pending,
            source_data.pan,
            source_data.sub_type,
            source_data.type,
            success
        ].join("");
        const createdHMAC = crypto_1.default.createHmac("SHA512", PayMob.HMAC);
        createdHMAC.update(concatenatedString);
        const hashedHMAC = createdHMAC.digest("hex");
        return hmac === hashedHMAC;
    }
    ;
    static getPaymentId(request) {
        const { merchant_order_id } = request.body.obj.order;
        return +merchant_order_id || 0;
    }
    ;
}
exports.PayMob = PayMob;
PayMob.tokenURL = process.env.PayMob_Token_URL;
PayMob.orderURL = process.env.PayMob_Order_URL;
PayMob.paymentKeysURL = process.env.PayMob_Payment_Keys_URL;
PayMob.APIKey = process.env.PayMob_API_Key;
PayMob.integrationId = +process.env.PayMob_Integration_Id;
PayMob.HMAC = process.env.PayMob_HMAC;
//# sourceMappingURL=PayMob.js.map