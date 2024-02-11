"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleValidation = exports.addRoleValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
const ModelPermission_1 = require("../../types/ModelPermission");
const validModels = Object.values(ModelPermission_1.AllowedModels);
const validPermissions = Object.values(ModelPermission_1.Permissions);
exports.addRoleValidation = [
    (0, express_validator_1.body)("input.name")
        .notEmpty().withMessage("Role name is required")
        .isString().withMessage("Role Name must be string")
        .isLength({ min: 3 }).withMessage("Too short role name, 3 characters at least")
        .isLength({ max: 32 }).withMessage("Too long role name, 32 characters at most"),
    (0, express_validator_1.body)("input.description")
        .optional()
        .isString()
        .isLength({ min: 10 }).withMessage("Too short description, 10 characters at least"),
    (0, express_validator_1.body)("input.allowedModels")
        .isArray({ min: 1 }).withMessage("Any role must have one controlled model at least")
        .customSanitizer((allowedModels) => [...new Map(allowedModels.map((obj) => [JSON.stringify(obj).toLowerCase(), obj])).values()])
        .custom(allowedModels => {
        for (const model of allowedModels) {
            if (!model.modelName || !validModels.includes(model.modelName.toLowerCase())) {
                throw new Error(`Invalid model: ${model.modelName}`);
            }
            if (!model.permissions || model.permissions.length === 0) {
                throw new Error('Any model must has one permission at least');
            }
            for (const permission of model.permissions) {
                if (!validPermissions.includes(permission.toLowerCase())) {
                    throw new Error(`Invalid permission: ${permission}`);
                }
            }
        }
        return true;
    }),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateRoleValidation = [
    (0, express_validator_1.body)("input.name")
        .optional()
        .isString().withMessage("Role Name must be string")
        .isLength({ min: 3 }).withMessage("Too short role name, 3 characters at least")
        .isLength({ max: 32 }).withMessage("Too long role name, 32 characters at most"),
    (0, express_validator_1.body)("input.description")
        .optional()
        .isString()
        .isLength({ min: 10 }).withMessage("Too short description, 10 characters at least"),
    (0, express_validator_1.body)("input.allowedModels")
        .optional()
        .isArray({ min: 1 }).withMessage("Any role must have one controlled model at least")
        .customSanitizer((allowedModels) => [...new Map(allowedModels.map((obj) => [JSON.stringify(obj).toLowerCase(), obj])).values()])
        .custom(allowedModels => {
        for (const model of allowedModels) {
            if (!model.modelName || !validModels.includes(model.modelName.toLowerCase())) {
                throw new Error(`Invalid model: ${model.modelName}`);
            }
            if (!model.permissions || model.permissions.length === 0) {
                throw new Error('Any model must has one permission at least');
            }
            for (const permission of model.permissions) {
                if (!validPermissions.includes(permission.toLowerCase())) {
                    throw new Error(`Invalid permission: ${permission}`);
                }
            }
        }
        return true;
    }),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=roleValidator.js.map