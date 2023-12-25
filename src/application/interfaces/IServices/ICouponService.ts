import { Prisma, Coupon } from "@prisma/client";
import { CreateCoupon, UpdateCoupon } from "../../inputs/couponInput";

export interface ICouponService {
  count(args: Prisma.CouponCountArgs): Promise<number>;
  findMany(args: Prisma.CouponFindManyArgs): Promise<Coupon[]>;
  findUnique(args: Prisma.CouponFindUniqueArgs): Promise<Coupon | null>
  create(args: {data: CreateCoupon, select?: Prisma.CouponSelect, include?: Prisma.CouponInclude}): Promise<Coupon>;
  update(args: {data: UpdateCoupon, select?: Prisma.CouponSelect, include?: Prisma.CouponInclude}): Promise<Coupon>;
  delete(id: number): Promise<Coupon>;
}