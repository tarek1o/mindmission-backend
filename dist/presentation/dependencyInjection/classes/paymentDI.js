"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const PaymentRepository_1 = require("../../../infrastructure/repositories/PaymentRepository");
const PaymentService_1 = require("../../../application/services/PaymentService");
const PaymentController_1 = require("../../controllers/PaymentController");
DIContainer_1.container.bind('IPaymentRepository').to(PaymentRepository_1.PaymentRepository).inRequestScope();
DIContainer_1.container.bind('IPaymentService').to(PaymentService_1.PaymentService).inRequestScope();
DIContainer_1.container.bind('PaymentController').to(PaymentController_1.PaymentController).inRequestScope();
//# sourceMappingURL=paymentDI.js.map