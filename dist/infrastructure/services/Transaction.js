"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const db_1 = __importDefault(require("../../domain/db"));
class Transaction {
    static async transact(fn, transaction) {
        try {
            return transaction ? await fn(transaction) : await db_1.default.$transaction(async (prismaTransaction) => await fn(prismaTransaction));
        }
        catch (error) {
            if (error.code === 'P2028') { // P2028 status code for Transaction error
                return await Transaction.transact(fn, transaction);
                // throw new APIError('Something went wrong, please try again!', HttpStatusCode.InternalServerError);
            }
            throw error;
        }
    }
    ;
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map