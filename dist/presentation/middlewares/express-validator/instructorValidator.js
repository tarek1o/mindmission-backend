"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInstructorValidation = exports.addInstructorValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
const client_1 = require("@prisma/client");
exports.addInstructorValidation = [
    (0, express_validator_1.body)("input.specialization")
        .notEmpty().withMessage('Your specialization is required')
        .isString().withMessage("Specialization must be a string")
        .isLength({ min: 10 }).withMessage("Too short specialization, must be 10 characters at least")
        .isLength({ max: 100 }).withMessage("Too long specialization, must be 100 characters at most"),
    (0, express_validator_1.body)("input.teachingType")
        .notEmpty().withMessage('Teaching type is required')
        .toUpperCase()
        .custom((value) => {
        if (!client_1.TeachingType[value]) {
            throw new Error(`Teaching type can be ${Object.values(client_1.TeachingType).map(value => value.toLowerCase()).toString()} only`);
        }
        return true;
    }),
    (0, express_validator_1.body)("input.videoProAcademy")
        .notEmpty().withMessage('Video Pro Academy is required')
        .toUpperCase()
        .custom((value) => {
        if (!client_1.VideoProAcademy[value]) {
            throw new Error(`Video Pro Academy can be ${Object.values(client_1.VideoProAcademy).map(value => value.toLowerCase()).toString()} only`);
        }
        return true;
    }),
    (0, express_validator_1.body)("input.haveAudience")
        .notEmpty().withMessage('HaveAudience type is required')
        .toUpperCase()
        .custom((value) => {
        if (!client_1.HaveAudience[value]) {
            throw new Error(`HaveAudience type can be ${Object.values(client_1.HaveAudience).map(value => value.toLowerCase()).toString()} only`);
        }
        return true;
    }),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateInstructorValidation = [
    (0, express_validator_1.body)("input.specialization")
        .optional()
        .isString().withMessage("Specialization must be a string")
        .isLength({ min: 10 }).withMessage("Too short specialization, must be 10 characters at least")
        .isLength({ max: 100 }).withMessage("Too long specialization, must be 100 characters at most"),
    (0, express_validator_1.body)("input.bref")
        .optional()
        .isString().withMessage("Specialization must be a string")
        .isLength({ min: 20 }).withMessage("Too short bref, must be 20 characters at least")
        .isLength({ max: 1000 }).withMessage("Too long bref, must be 1000 characters at most"),
    (0, express_validator_1.body)("input.skills")
        .notEmpty().withMessage('Video Pro Academy is required')
        .isArray().withMessage('Skills must be an array of skill object')
        .custom((skills) => {
        skills.forEach((skill) => {
            if (!skill.name) {
                throw new Error('Any skill object must have a name key');
            }
            if (typeof skill.name !== 'string') {
                throw new Error(`${skill.name} is not a string`);
            }
        });
        return true;
    }),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=instructorValidator.js.map