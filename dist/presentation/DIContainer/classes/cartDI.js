"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const CartRepository_1 = require("../../../infrastructure/repositories/CartRepository");
const CartService_1 = require("../../../application/services/CartService");
const CartController_1 = require("../../controllers/CartController");
DIContainer_1.container.bind('ICartRepository').to(CartRepository_1.CartRepository).inSingletonScope();
DIContainer_1.container.bind('ICartService').to(CartService_1.CartService).inSingletonScope();
DIContainer_1.container.bind('CartController').to(CartController_1.CartController).inSingletonScope();
//# sourceMappingURL=cartDI.js.map