import {body} from "express-validator";
import { CourseLevel, Language } from "@prisma/client";
import ErrorExpressValidatorHandler from "../../errorHandlers/ErrorExpressValidatorHandler";

export const addCourseValidation = [
  body("input.title")
    .notEmpty().withMessage("Course title is required")
    .isString().withMessage("Course title must be string")
    .isLength({min: 20}).withMessage("Too short course title, 20 characters at least")
    .isLength({max: 1000}).withMessage("Too long course title, 1000 characters at most"),

  body("input.shortDescription")
    .notEmpty().withMessage("Short Description is required")
    .isString().withMessage('Description must be string')
    .isLength({min: 10}).withMessage("Short Description is too short, 10 characters at least")
    .isLength({max: 1000}).withMessage("Short Description is Too long, 500 characters at most"),
  
  body("input.description")
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be string')
    .isLength({min: 50}).withMessage("Too short description, 50 characters at least"),

  body("input.language")
    .notEmpty().withMessage("Language is required")
    .toUpperCase()
    .custom((value) => {
      if(!Language[value as Language]) {
        const allowedLanguages = Object.values(Language).map(value => value.toLowerCase()).toString();
        throw new Error(`The Language can be ${allowedLanguages} only`)
      }
      return true;
    }),
  
  body("input.level")
    .notEmpty().withMessage("Level is required")
    .toUpperCase()
    .custom((value) => {
      if(!CourseLevel[value as CourseLevel]) {
        const allowedLevels = Object.values(CourseLevel).map(value => value.toLowerCase()).toString();
        throw new Error(`The levels can be ${allowedLevels} only`)
      }
      return true;
    }),
  
  body("input.imageCover")
    .notEmpty().withMessage("Image cover is required")
    .isURL().withMessage('Invalid image cover formate, must be a url'),
    
  body("input.requirements")
    .notEmpty().withMessage("Requirements are required")
    .isArray().withMessage('Requirements must be an array of strings')
    .custom(requirements => {
      requirements.forEach((requirement: any) => {
        if(typeof requirement !== 'string') {
          throw new Error(`${requirement} is not a string`);
        }
      });
      return true;
    }),
  
  body("input.courseTeachings")
    .notEmpty().withMessage("Course Teachings are required")
    .isArray({min: 1}).withMessage('Course Teachings must be an array of strings')
    .custom(courseTeachings => {
      courseTeachings.forEach((courseTeachings: any) => {
        if(typeof courseTeachings !== 'string') {
          throw new Error(`${courseTeachings} is not a string`);
        }
      });
      return true;
    }),
  
  body("input.price")
    .notEmpty().withMessage("Any course must have a price")
    .isFloat({min: 0}).withMessage('Price must be a floating number more than or equal 0'),
  
  body("input.discountPercentage")
    .optional()
    .isFloat({min: 0, max: 100}).withMessage('Discount Percentage must be a floating number between 0 and 100'),
    
  body("input.topicId")
    .notEmpty().withMessage('Any course must belong to a topic')
    .isInt().withMessage("TopicId must be an integer number"),

  ErrorExpressValidatorHandler.catchExpressValidatorErrors
];