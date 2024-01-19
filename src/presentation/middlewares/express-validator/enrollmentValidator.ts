import {body} from "express-validator";
import ErrorExpressValidatorHandler from "../../errorHandlers/ErrorExpressValidatorHandler";

export const updateEnrollmentValidation = [
  body("input.courseId")
    .notEmpty().withMessage("CourseId is required")
    .isInt({min: 1}).withMessage("CourseId must be an integer number more than or equal to 1"),
  
  body("input.lessonId")
  .notEmpty().withMessage("LessonId is required")
  .isInt({min: 1}).withMessage("LessonId must be an integer number more than or equal to 1"),

  ErrorExpressValidatorHandler.catchExpressValidatorErrors
];