"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const certificateValidator_1 = require("../middlewares/express-validator/certificateValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllCertificates, getCertificateById, updateCertificate, deleteCertificate } = DI_1.default.get('CertificateController');
const certificateRouter = express_1.default.Router();
certificateRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Certificate', 'GET'), getAllCertificates);
certificateRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Certificate', 'GET'), getCertificateById);
certificateRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Certificate', 'PATCH'), certificateValidator_1.updateCertificateValidation, updateCertificate);
certificateRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Certificate', 'DELETE'), deleteCertificate);
exports.default = certificateRouter;
//# sourceMappingURL=certificateRoutes.js.map