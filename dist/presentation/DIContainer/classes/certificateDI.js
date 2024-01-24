"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const CertificateRepository_1 = require("../../../infrastructure/repositories/CertificateRepository");
const CertificateService_1 = require("../../../application/services/CertificateService");
const CertificateController_1 = require("../../controllers/CertificateController");
DIContainer_1.container.bind('ICertificateRepository').to(CertificateRepository_1.CertificateRepository).inSingletonScope();
DIContainer_1.container.bind('ICertificateService').to(CertificateService_1.CertificateService).inSingletonScope();
DIContainer_1.container.bind('CertificateController').to(CertificateController_1.CertificateController).inSingletonScope();
//# sourceMappingURL=certificateDI.js.map