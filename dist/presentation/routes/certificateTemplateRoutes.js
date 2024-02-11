"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllCertificateTemplates, getCertificateTemplateById, createCertificateTemplate, updateCertificateTemplate, deleteCertificateTemplate } = DI_1.default.get('CertificateTemplateController');
const certificateTemplateRouter = express_1.default.Router();
certificateTemplateRouter.route("/get")
    .post(isAuthenticated, isAuthorized('CertificateTemplate', 'GET'), getAllCertificateTemplates);
certificateTemplateRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('CertificateTemplate', 'GET'), getCertificateTemplateById);
certificateTemplateRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('CertificateTemplate', 'POST'), createCertificateTemplate, createCertificateTemplate);
certificateTemplateRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('CertificateTemplate', 'PATCH'), updateCertificateTemplate, updateCertificateTemplate);
certificateTemplateRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('CertificateTemplate', 'DELETE'), deleteCertificateTemplate);
exports.default = certificateTemplateRouter;
//# sourceMappingURL=certificateTemplateRoutes.js.map