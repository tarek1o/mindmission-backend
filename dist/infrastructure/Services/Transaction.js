"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const db_1 = __importDefault(require("../../domain/db"));
class Transaction {
    static transact(fn) {
        try {
            return db_1.default.$transaction(fn);
        }
        catch (error) {
            if (error.code !== 'P2025') {
                throw error;
            }
            return Transaction.transact(fn);
        }
    }
    ;
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map