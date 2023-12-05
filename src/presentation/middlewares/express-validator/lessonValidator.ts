import {body, } from "express-validator";
import ErrorExpressValidatorHandler from "../../errorHandlers/ErrorExpressValidatorHandler";
import { LessonType } from "@prisma/client";

export const addLessonValidation = [
  body("input.title")
    .notEmpty().withMessage("Lesson title is required")
    .isString().withMessage("Lesson title must be string")
    .isLength({min: 5}).withMessage("Too short Lesson title, 5 characters at least")
    .isLength({max: 1000}).withMessage("Too long Lesson title, 1000 characters at most"),
  
  body("input.isFree")
    .optional()
    .isBoolean().withMessage("isFree property must be a boolean value"),

  body("input.attachment")
    .optional()
    .isURL().withMessage("Lesson Attachment must be a url formate"),

  body("input.order")
    .notEmpty().withMessage("Order is required")
    .isInt({min: 1}).withMessage("Order must be an integer number more than or equal to 1"),
  
  body("input.lessonType")
    .notEmpty().withMessage("Lesson type is required")
    .toUpperCase()
    .custom(value => {
      if(!LessonType[value as LessonType]) {
        const allowedLessonTypes = Object.values(LessonType).map(value => value.toLowerCase()).toString();
        throw new Error(`The lesson types can be ${allowedLessonTypes} only`)
      }
      return true;
    }),

  body("input.chapterId")
    .notEmpty().withMessage("ChapterId is required")
    .isInt({min: 1}).withMessage("ChapterId must be an integer number more than or equal to 1"),
  
  ErrorExpressValidatorHandler.catchExpressValidatorErrors
];

export const updateLessonValidation = [
  body("input.title")
    .optional()
    .isString().withMessage("Lesson title must be string")
    .isLength({min: 5}).withMessage("Too short Lesson title, 5 characters at least")
    .isLength({max: 1000}).withMessage("Too long Lesson title, 1000 characters at most"),
  
  body("input.isFree")
    .optional()
    .isBoolean().withMessage("isFree property must be a boolean value"),

  body("input.attachment")
    .optional()
    .isURL().withMessage("Lesson Attachment must be a url formate"),

  body("input.lessonType")
    .optional()
    .toUpperCase()
    .custom(value => {
      if(!LessonType[value as LessonType]) {
        const allowedLessonTypes = Object.values(LessonType).map(value => value.toLowerCase()).toString();
        throw new Error(`The lesson types can be ${allowedLessonTypes} only`)
      }
      return true;
    }),
  
  ErrorExpressValidatorHandler.catchExpressValidatorErrors
];