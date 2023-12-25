"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const PaymentRepository_1 = require("../../../infrastructure/repositories/PaymentRepository");
const PaymentService_1 = require("../../../application/services/PaymentService");
DIContainer_1.container.bind('IPaymentRepository').to(PaymentRepository_1.PaymentRepository).inRequestScope();
DIContainer_1.container.bind('IPaymentService').to(PaymentService_1.PaymentService).inRequestScope();
//# sourceMappingURL=paymentDI.js.map