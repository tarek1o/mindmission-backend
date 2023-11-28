"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryValidation = exports.addCategoryValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
const client_1 = require("@prisma/client");
exports.addCategoryValidation = [
    (0, express_validator_1.body)("input.name")
        .notEmpty().withMessage("Category name is required")
        .isString().withMessage("Category Name must be string")
        .isLength({ min: 3 }).withMessage("Too short category name, 3 characters at least")
        .isLength({ max: 32 }).withMessage("Too long category name, 32 characters at most"),
    (0, express_validator_1.body)("input.description")
        .optional()
        .isString().withMessage('Description must be string')
        .isLength({ min: 10 }).withMessage("Too short description, 10 characters at least"),
    (0, express_validator_1.body)("input.type")
        .notEmpty().withMessage("Type property is required")
        .isString().withMessage("Type must be a string")
        .toUpperCase()
        .custom((value) => {
        if (!client_1.CategoryType[value]) {
            const allowedTypes = Object.values(client_1.CategoryType).map(value => value.toLowerCase()).toString();
            throw new Error(`The type cannot be ${allowedTypes} only`);
        }
        return true;
    }),
    (0, express_validator_1.body)("input.parentId")
        .optional()
        .isInt().withMessage("ParentId must be an integer number"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateCategoryValidation = [
    (0, express_validator_1.body)("input.name")
        .optional()
        .isString().withMessage("Category Name must be string")
        .isLength({ min: 3 }).withMessage("Too short category name, 3 characters at least")
        .isLength({ max: 32 }).withMessage("Too long category name, 32 characters at most"),
    (0, express_validator_1.body)("input.description")
        .optional()
        .isString().withMessage('Description must be string')
        .isLength({ min: 10 }).withMessage("Too short description, 10 characters at least"),
    (0, express_validator_1.body)("input.type")
        .optional()
        .isString().withMessage("Type must be a string")
        .toUpperCase()
        .custom((value) => {
        if (!client_1.CategoryType[value]) {
            const allowedTypes = Object.values(client_1.CategoryType).map(value => value.toLowerCase()).toString();
            throw new Error(`The type can be ${allowedTypes} only`);
        }
        return true;
    }),
    (0, express_validator_1.body)("input.parentId")
        .optional()
        .isInt().withMessage("ParentId must be an integer number"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=categoryValidator.js.map