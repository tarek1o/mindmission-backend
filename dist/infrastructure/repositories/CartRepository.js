"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const inversify_1 = require("inversify");
const db_1 = __importDefault(require("../../domain/db"));
let CartRepository = class CartRepository {
    count(args) {
        throw db_1.default.cart.count(args);
    }
    ;
    findMany(args) {
        return db_1.default.cart.findMany(args);
    }
    ;
    findUnique(args) {
        return db_1.default.cart.findUnique(args);
    }
    ;
    findFirst(args) {
        return db_1.default.cart.findFirst(args);
    }
    update(args, transaction) {
        return (transaction || db_1.default).cart.update(args);
    }
    ;
};
exports.CartRepository = CartRepository;
exports.CartRepository = CartRepository = __decorate([
    (0, inversify_1.injectable)()
], CartRepository);
//# sourceMappingURL=CartRepository.js.map