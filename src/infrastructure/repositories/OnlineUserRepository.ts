import { Prisma, OnlineUser } from "@prisma/client";
import { injectable } from "inversify";
import { IOnlineUserRepository } from "../../application/interfaces/IRepositories/IOnlineUserRepository";
import prisma from "../../domain/db";

@injectable()
export class OnlineUserRepository implements IOnlineUserRepository {
  constructor() {}

  aggregate(args: Prisma.OnlineUserAggregateArgs): Prisma.PrismaPromise<Prisma.GetOnlineUserAggregateType<Prisma.OnlineUserAggregateArgs>> {
    return prisma.onlineUser.aggregate(args);
  }

  count(args: Prisma.OnlineUserCountArgs): Promise<number> {
    return prisma.onlineUser.count(args)
  }

  findMany(args: Prisma.OnlineUserFindManyArgs): Promise<OnlineUser[]> {
    return prisma.onlineUser.findMany(args);
  }

  findUnique(args: Prisma.OnlineUserFindUniqueArgs): Promise<OnlineUser | null> {
    return prisma.onlineUser.findUnique(args);
  }

  findFirst(args: Prisma.OnlineUserFindFirstArgs): Promise<OnlineUser | null> {
    return prisma.onlineUser.findFirst(args);
  }

  upsert(args: Prisma.OnlineUserUpsertArgs): Promise<OnlineUser> {
    return prisma.onlineUser.upsert(args);
  }

  delete(args: Prisma.OnlineUserDeleteArgs): Promise<OnlineUser> {
    return prisma.onlineUser.delete(args);
  }
}