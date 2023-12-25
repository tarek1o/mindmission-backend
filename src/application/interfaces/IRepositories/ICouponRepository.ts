import { Coupon } from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface ICouponRepository extends IRepository<Coupon> {
}