"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const CouponRepository_1 = require("../../../infrastructure/repositories/CouponRepository");
const CouponService_1 = require("../../../application/services/CouponService");
const CouponController_1 = require("../../controllers/CouponController");
DIContainer_1.container.bind('ICouponRepository').to(CouponRepository_1.CouponRepository).inRequestScope();
DIContainer_1.container.bind('ICouponService').to(CouponService_1.CouponService).inRequestScope();
DIContainer_1.container.bind('CouponController').to(CouponController_1.CouponController).inRequestScope();
//# sourceMappingURL=couponDI.js.map