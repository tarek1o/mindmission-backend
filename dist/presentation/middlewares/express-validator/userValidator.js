"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPasswordValidation = exports.updateUserEmailValidation = exports.updateUserValidation = exports.addUserValidation = void 0;
const express_validator_1 = require("express-validator");
const ErrorExpressValidatorHandler_1 = __importDefault(require("../../errorHandlers/ErrorExpressValidatorHandler"));
const client_1 = require("@prisma/client");
const allowedMobilePhoneCountries = ['am-AM', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-EH', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-OM', 'ar-PS', 'ar-SA', 'ar-SY', 'ar-TN', 'ar-YE', 'az-AZ', 'be-BY', 'bg-BG', 'bn-BD', 'bs-BA', 'cs-CZ', 'de-AT', 'de-CH', 'de-DE', 'de-LU', 'da-DK', 'dv-MV', 'dz-BT', 'el-CY', 'el-GR', 'en-AG', 'en-AI', 'en-AU', 'en-BM', 'en-BS', 'en-BW', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-GY', 'en-HK', 'en-HN', 'en-IE', 'en-IN', 'en-JM', 'en-KE', 'en-KI', 'en-KN', 'en-LS', 'en-MT', 'en-MU', 'en-NA', 'en-NG', 'en-NZ', 'en-PG', 'en-PH', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-SS', 'en-TZ', 'en-UG', 'en-US', 'en-ZA', 'en-ZM', 'en-ZW', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-CU', 'es-DO', 'es-EC', 'es-ES', 'es-HN', 'es-MX', 'es-NI', 'es-PA', 'es-PE', 'es-PY', 'es-SV', 'es-UY', 'es-VE', 'et-EE', 'fa-AF', 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-BF', 'fr-BJ', 'fr-CD', 'fr-CH', 'fr-CM', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-PF', 'fr-RE', 'ga-IE', 'he-IL', 'hu-HU', 'id-ID', 'ir-IR', 'it-CH', 'it-IT', 'it-SM', 'ja-JP', 'ka-GE', 'kk-KZ', 'kl-GL', 'ko-KR', 'ky-KG', 'lt-LT', 'lv-LV', 'mg-MG', 'mn-MN', 'ms-MY', 'my-MM', 'mz-MZ', 'nb-NO', 'nl-AW', 'nl-BE', 'nl-NL', 'ne-NP', 'nn-NO', 'pl-PL', 'pt-AO', 'pt-BR', 'pt-PT', 'ro-MD', 'ro-RO', 'ru-RU', 'si-LK', 'sk-SK', 'sl-SI', 'sq-AL', 'sr-RS', 'sv-SE', 'tg-TJ', 'th-TH', 'tk-TM', 'tr-TR', 'uk-UA', 'uz-Uz', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-TW'];
const allowedPlatforms = Object.values(client_1.Platform);
exports.addUserValidation = [
    (0, express_validator_1.body)("input.firstName")
        .notEmpty().withMessage("First Name is required")
        .isString().withMessage("First Name must be string")
        .isLength({ min: 3 }).withMessage("Too short first name, 3 characters at least")
        .isLength({ max: 32 }).withMessage("Too long first name, 32 characters at most"),
    (0, express_validator_1.body)("input.lastName")
        .notEmpty().withMessage("Last Name is required")
        .isString().withMessage("Last Name must be string")
        .isLength({ min: 3 }).withMessage("Too short last name, 3 characters at least")
        .isLength({ max: 32 }).withMessage("Too long last name, 32 characters at most"),
    (0, express_validator_1.body)("input.email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("input.password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    (0, express_validator_1.body)("input.mobilePhone")
        .optional()
        .isMobilePhone(allowedMobilePhoneCountries).withMessage("Invalid Mobile Phone"),
    (0, express_validator_1.body)("input.whatsAppNumber")
        .optional()
        .isMobilePhone(allowedMobilePhoneCountries).withMessage("Invalid WhatsApp number"),
    (0, express_validator_1.body)("input.bio")
        .optional()
        .isString().withMessage("Bio must be a string")
        .isLength({ min: 10 }).withMessage("Too short bio, must be at least 10 characters"),
    (0, express_validator_1.body)("input.picture")
        .optional()
        .isURL().withMessage("picture must be in URL format"),
    (0, express_validator_1.body)("input.roleId")
        .notEmpty().withMessage("Role is required")
        .isInt().withMessage("Role Id must be an integer number"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateUserValidation = [
    (0, express_validator_1.body)("input.firstName")
        .optional()
        .isString().withMessage("First Name must be string")
        .isLength({ min: 3 }).withMessage("Too short first name, 3 characters at least")
        .isLength({ max: 32 }).withMessage("Too long first name, 32 characters at most"),
    (0, express_validator_1.body)("input.lastName")
        .optional()
        .isString().withMessage("Last Name must be string")
        .isLength({ min: 3 }).withMessage("Too short last name, 3 characters at least")
        .isLength({ max: 32 }).withMessage("Too long last name, 32 characters at most"),
    (0, express_validator_1.body)("input.mobilePhone")
        .optional()
        .isMobilePhone(allowedMobilePhoneCountries).withMessage("Invalid Mobile Phone"),
    (0, express_validator_1.body)("input.whatsAppNumber")
        .optional()
        .isMobilePhone(allowedMobilePhoneCountries).withMessage("Invalid WhatsApp number"),
    (0, express_validator_1.body)("input.bio")
        .optional()
        .isString().withMessage("Bio must be a string")
        .isLength({ min: 10 }).withMessage("Too short bio, must be at least 10 characters"),
    (0, express_validator_1.body)("input.picture")
        .optional()
        .isURL().withMessage("picture must be in URL format"),
    (0, express_validator_1.body)("input.personalLinks")
        .optional()
        .isArray().withMessage("Personal Links must be an array")
        .custom(personalLinks => {
        personalLinks.forEach((link) => {
            if (typeof link !== 'object') {
                throw new Error('Personal link must be an object');
            }
            if (!link.hasOwnProperty('platform')) {
                throw new Error('Personal link must have a platform property');
            }
            if (!link.platform) {
                throw new Error('Personal link platform cannot be empty');
            }
            if (!allowedPlatforms.includes(link.platform.toUpperCase())) {
                throw new Error(`Personal link platform can be ${allowedPlatforms.map(platform => platform.toLowerCase()).toString()} only`);
            }
            if (!link.hasOwnProperty('link')) {
                throw new Error('Personal link must have a link property');
            }
            if (!link.link) {
                throw new Error('Personal link cannot be empty');
            }
            if (!/^(https):\/\/[^\s/$.?#].[^\s]*$/i.test(link.link)) {
                throw new Error("Invalid personal link formate");
            }
        });
        return true;
    }),
    (0, express_validator_1.body)("input.roleId")
        .optional()
        .isInt().withMessage("Role Id must be an integer number"),
    (0, express_validator_1.body)("input.isBlocked")
        .optional()
        .isBoolean().withMessage("isBlocked must be a boolean; true or false"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateUserEmailValidation = [
    (0, express_validator_1.body)("input.email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("input.newEmail")
        .notEmpty().withMessage("New Email is required")
        .isEmail().withMessage("Invalid new email"),
    (0, express_validator_1.body)("input.password")
        .notEmpty().withMessage("Password is required"),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
exports.updateUserPasswordValidation = [
    (0, express_validator_1.body)("input.email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("input.password")
        .notEmpty().withMessage("Password is required"),
    (0, express_validator_1.body)("input.newPassword")
        .notEmpty().withMessage("New Password is required")
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    ErrorExpressValidatorHandler_1.default.catchExpressValidatorErrors
];
//# sourceMappingURL=userValidator.js.map