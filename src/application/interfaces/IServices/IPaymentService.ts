import { Prisma } from "@prisma/client";
import { CreatePayment, UpdatePayment } from "../../inputs/paymentInput";
import { ExtendedPayment } from "../../types/ExtendedPayment";

export interface IPaymentService {
  count(args: Prisma.PaymentCountArgs): Promise<number>;
  findMany(args: Prisma.PaymentFindManyArgs): Promise<ExtendedPayment[]>;
  findUnique(args: Prisma.PaymentFindUniqueArgs): Promise<ExtendedPayment | null>
  create(args: {data: CreatePayment, select?: Prisma.PaymentSelect, include?: Prisma.PaymentInclude}): Promise<ExtendedPayment>;
  update(args: {data: UpdatePayment, select?: Prisma.PaymentSelect, include?: Prisma.PaymentInclude}): Promise<ExtendedPayment>;
  deleteNotCompletedPayment(id: number): void;
  delete(id: number): Promise<ExtendedPayment>;
}