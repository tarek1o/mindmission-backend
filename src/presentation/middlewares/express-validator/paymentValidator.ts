import { body } from "express-validator";
import { Currency, PaymentMethod } from "@prisma/client";
import ErrorExpressValidatorHandler from "../../errorHandlers/ErrorExpressValidatorHandler";

export const payValidation = [
  body("input.currency")
    .notEmpty().withMessage("Currency is required")
    .toUpperCase()
    .custom((value) => {
      if(!Currency[value as Currency]) {
        throw new Error(`Currency can be ${Object.values(Currency).map(value => value.toLowerCase()).toString()} only`)
      }
      return true;
    }),
  
  body("input.paymentMethod")
    .notEmpty().withMessage("Payment Method is required")
    .toUpperCase()
    .custom((value) => {
      if(!PaymentMethod[value as PaymentMethod]) {
        throw new Error(`Payment Method can be ${Object.values(PaymentMethod).map(value => value.toLowerCase()).toString()} only`)
      }
      return true;
    }),
  
  body("input.paymentUnits")
    .notEmpty().withMessage('Payment Units are required')
    .isArray().withMessage('Payment Units must be an array of integer numbers')
    .custom(paymentUnits => {
      for(const unit of paymentUnits) {
        if (!Number.isInteger(unit) || unit < 1) {
          throw new Error("Payment Units must be an array of positive integer numbers")
        }
      }
      return true;
    }),
  
  body("input.couponCode")
    .optional()
    .isString().withMessage('Coupon code must be a string'),

  ErrorExpressValidatorHandler.catchExpressValidatorErrors
];