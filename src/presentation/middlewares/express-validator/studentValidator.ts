import {body} from "express-validator";
import { Currency, PaymentMethod } from "@prisma/client";
import ErrorExpressValidatorHandler from "../../errorHandlers/ErrorExpressValidatorHandler";

export const wishlistValidation = [
  body("input.courseId")
    .notEmpty().withMessage('CourseId is required')
    .isInt({min: 1}).withMessage("CourseId must be an integer number more than or equal to 1"),

  ErrorExpressValidatorHandler.catchExpressValidatorErrors
];

export const enrollValidation = [
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

export const rateValidation = [
  body("input.courseRate")
    .optional()
    .isFloat({min: 1, max: 5}).withMessage("Course rate must be a float number between 1 and 5"),
  
  body("input.instructorRate")
    .optional()
    .isFloat({min: 1, max: 5}).withMessage("Instructor rate must be a float number between 1 and 5"),
  
  body("input.commentForCourse")
    .optional()
    .isString().withMessage('Coupon code must be a string'),
  
  body("input.commentForInstructor")
    .optional()
    .isString().withMessage('Coupon code must be a string'),
  
  body("input.courseId")
    .notEmpty().withMessage("Course Id is required")
    .isInt({min: 1}).withMessage('Course Id must be an integer number more than or equal to 1'),

  ErrorExpressValidatorHandler.catchExpressValidatorErrors
];