import crypto from "crypto"
import { Currency } from "@prisma/client";
import { ExtendedPaymentUnit } from "../../application/types/ExtendedPaymentUnit";
import { ExtendedRequest } from "../types/ExtendedRequest";
import HTTPStatusCode from "../enums/HTTPStatusCode";
import APIError from "../errorHandlers/APIError";

export default abstract class PayMob {
  private static tokenURL: string = process.env.PayMob_Token_URL as string;
  private static orderURL: string = process.env.PayMob_Order_URL as string;
  private static paymentKeysURL: string = process.env.PayMob_Payment_Keys_URL as string;
  private static APIKey: string = process.env.PayMob_API_Key as string;
  private static integrationId = +(process.env.PayMob_Integration_Id as string);
  private static HMAC = process.env.PayMob_HMAC as string;

  private static async getAuthToken(): Promise<string> {
    const response = await fetch(PayMob.tokenURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: PayMob.APIKey
      })
    });
    if(response.status !== HTTPStatusCode.Created) {
      throw new APIError("PayMob error: something wrong during get auth token, please try again", HTTPStatusCode.InternalServerError);
    }
    const {token} = await response.json();
    return token;
  };

  private static async getOrderId(token: string, paymentId: number, totalPrice: number, currency: Currency, orderItems: ExtendedPaymentUnit[]): Promise<number> {
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
          return {
            name: item.course?.title || "",
            amount_cents: `${item.price * 100}`,
            description: item.course?.description || "",
            quantity: 1
          }
        }),
      })
    });
    if(response.status !== HTTPStatusCode.Created) {
      const message = await response.json();
      throw new APIError(`PayMob error: ${message.message}, please try again`, HTTPStatusCode.InternalServerError)
    }
    const {id} = await response.json();
    return id;
  };

  private static async getPaymentToken(authToken: string, orderId: number, totalPrice: number, currency: Currency): Promise<string> {
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
    if(response.status !== HTTPStatusCode.Created) {
      const error = await response.json();
      throw new APIError(`PayMob error: ${error.message}, please try again`, HTTPStatusCode.InternalServerError);
    }
    const {token} = await response.json();
    return token;
  };

  static async createPaymentOrder(paymentId: number, totalPrice: number, currency: Currency, discount: number, orderItems: ExtendedPaymentUnit[]): Promise<string> {
    const totalPriceInCents: number = (totalPrice - totalPrice * (discount / 100)) * 100;
    const token = await PayMob.getAuthToken();
    const orderId = await PayMob.getOrderId(token, paymentId, totalPriceInCents, currency, orderItems);
    return await PayMob.getPaymentToken(token, orderId, totalPriceInCents, currency);
  };

  static isValidRequest(request: ExtendedRequest): boolean {
    const {hmac} = request.query;
    const {id, pending, amount_cents, success, is_auth, is_capture, is_standalone_payment, is_voided, is_refunded, is_3d_secure, integration_id, has_parent_transaction, currency, created_at, error_occured, owner, order, source_data} = request.body.obj;
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
    const createdHMAC = crypto.createHmac("SHA512", PayMob.HMAC);
    createdHMAC.update(concatenatedString);
    const hashedHMAC = createdHMAC.digest("hex");
    return hmac === hashedHMAC;
  };

  static getPaymentId(request: ExtendedRequest): number {
    const {merchant_order_id} = request.body.obj.order;
    return +merchant_order_id || 0; 
  };
}