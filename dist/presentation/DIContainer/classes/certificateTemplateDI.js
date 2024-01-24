"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const CertificateTemplateRepository_1 = require("../../../infrastructure/repositories/CertificateTemplateRepository");
const CertificateTemplateService_1 = require("../../../application/services/CertificateTemplateService");
const CertificateTemplateController_1 = require("../../controllers/CertificateTemplateController");
DIContainer_1.container.bind('ICertificateTemplateRepository').to(CertificateTemplateRepository_1.CertificateTemplateRepository).inSingletonScope();
DIContainer_1.container.bind('ICertificateTemplateService').to(CertificateTemplateService_1.CertificateTemplateService).inSingletonScope();
DIContainer_1.container.bind('CertificateTemplateController').to(CertificateTemplateController_1.CertificateTemplateController).inSingletonScope();
//# sourceMappingURL=certificateTemplateDI.js.map