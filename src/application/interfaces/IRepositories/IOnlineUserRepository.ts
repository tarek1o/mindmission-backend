import { Prisma, OnlineUser } from "@prisma/client";
import { IFindBaseRepository } from "./Base/IFindBaseRepository";

export interface IOnlineUserRepository extends IFindBaseRepository<OnlineUser> {
  aggregate(args: Prisma.OnlineUserAggregateArgs): Prisma.PrismaPromise<Prisma.GetOnlineUserAggregateType<Prisma.OnlineUserAggregateArgs>>
  findFirst(args: Prisma.OnlineUserFindFirstArgs): Promise<OnlineUser | null>;
  upsert(args: Prisma.OnlineUserUpsertArgs): Promise<OnlineUser>
  delete(args: Prisma.OnlineUserDeleteArgs): Promise<OnlineUser>;
}