"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const enrollmentValidator_1 = require("../middlewares/express-validator/enrollmentValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllEnrollments, getEnrollmentById, updateEnrollment, deleteEnrollment } = DI_1.default.get('EnrollmentController');
const enrollmentRouter = express_1.default.Router();
enrollmentRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Enrollment', 'GET'), getAllEnrollments);
enrollmentRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Enrollment', 'GET'), getEnrollmentById);
enrollmentRouter.route("/update")
    .post(isAuthenticated, isAuthorized('Enrollment', 'PATCH'), enrollmentValidator_1.updateEnrollmentValidation, updateEnrollment);
enrollmentRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Enrollment', 'DELETE'), deleteEnrollment);
exports.default = enrollmentRouter;
//# sourceMappingURL=enrollmentRoutes.js.map