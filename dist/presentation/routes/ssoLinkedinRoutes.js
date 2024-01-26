"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const ssoValidator_1 = require("../middlewares/express-validator/ssoValidator");
const authenticationValidator_1 = require("../middlewares/express-validator/authenticationValidator");
const instructorValidator_1 = require("../middlewares/express-validator/instructorValidator");
const Linkedin_1 = require("../middlewares/sso/Linkedin");
const linkedin = new Linkedin_1.Linkedin();
const { signup, login } = DI_1.default.get('AuthenticationController');
const ssoRouter = express_1.default.Router();
ssoRouter.route("/signup/student")
    .post(ssoValidator_1.ssoValidation, linkedin.signup, authenticationValidator_1.signupValidation, signup);
ssoRouter.route("/signup/instructor")
    .post(ssoValidator_1.ssoValidation, linkedin.signup, authenticationValidator_1.signupValidation, instructorValidator_1.addInstructorValidation, signup);
ssoRouter.route("/login")
    .post(ssoValidator_1.ssoValidation, linkedin.login, login);
exports.default = ssoRouter;
//# sourceMappingURL=ssoLinkedinRoutes.js.map