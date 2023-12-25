import { Prisma, Coupon } from "@prisma/client";
import { injectable } from "inversify";
import { ICouponRepository } from "../../application/interfaces/IRepositories/ICouponRepository";
import prisma from "../../domain/db";

@injectable()
export class CouponRepository implements ICouponRepository {
  constructor() {}

  count(args: Prisma.CouponCountArgs): Promise<number> {
    return prisma.coupon.count(args)
  }

  findMany(args: Prisma.CouponFindManyArgs): Promise<Coupon[]> {
    return prisma.coupon.findMany(args);
  }

  findUnique(args: Prisma.CouponFindUniqueArgs): Promise<Coupon | null> {
    return prisma.coupon.findUnique(args);
  }

  create(args: Prisma.CouponCreateArgs): Promise<Coupon> {
    return prisma.coupon.create(args);
  }

  update(args: Prisma.CouponUpdateArgs): Promise<Coupon> {
    return prisma.coupon.update(args);
  }

  delete(id: number): Promise<Coupon> {
    return prisma.coupon.delete({
      where: {
        id,
      }
    });
  }
}