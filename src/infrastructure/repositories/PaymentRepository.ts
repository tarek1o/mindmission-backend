import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { IPaymentRepository } from "../../application/interfaces/IRepositories/IPaymentRepository";
import prisma from "../../domain/db";
import { ExtendedPayment } from "../../application/types/ExtendedPayment";

@injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor() {}

  count(args: Prisma.PaymentCountArgs): Promise<number> {
    return prisma.payment.count(args)
  }

  findMany(args: Prisma.PaymentFindManyArgs): Promise<ExtendedPayment[]> {
    return prisma.payment.findMany(args);
  }

  findUnique(args: Prisma.PaymentFindUniqueArgs): Promise<ExtendedPayment | null> {
    return prisma.payment.findUnique(args);
  }

  create(args: Prisma.PaymentCreateArgs): Promise<ExtendedPayment> {
    return prisma.payment.create(args);
  }

  update(args: Prisma.PaymentUpdateArgs): Promise<ExtendedPayment> {
    return prisma.payment.update(args);
  }

  delete(id: number): Promise<ExtendedPayment> {
    return prisma.payment.delete({
      where: {
        id,
      }
    });
  }
}