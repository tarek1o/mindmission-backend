import prisma from "../../domain/db";

export abstract class Transaction {
  static async transact<T>(fn: () => Promise<T>): Promise<T>{
		try {
			return await prisma.$transaction(fn);
		}catch(error: any) {
			if(error.code !== 'P2025') {
				throw error;
			}
			return await Transaction.transact<T>(fn);
		}
	};
}