import prisma from "../../domain/db";

export abstract class Transaction {
  static transact<T>(fn: () => Promise<T>): Promise<T>{
		try {
			return prisma.$transaction(fn);
		}catch(error: any) {
			if(error.code !== 'P2025') {
				throw error;
			}
			return Transaction.transact<T>(fn);
		}
	};
}