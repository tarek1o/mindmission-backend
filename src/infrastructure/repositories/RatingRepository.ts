import { Prisma, Rating } from "@prisma/client";
import { injectable } from "inversify";
import { IRatingRepository } from "../../application/interfaces/IRepositories/IRatingRepository";
import prisma from "../../domain/db";

@injectable()
export class RatingRepository implements IRatingRepository {
  constructor() {}

  count(args: Prisma.RatingCountArgs): Promise<number> {
    return prisma.rating.count(args)
  }

  findMany(args: Prisma.RatingFindManyArgs): Promise<Rating[]> {
    return prisma.rating.findMany(args);
  }

  findUnique(args: Prisma.RatingFindUniqueArgs): Promise<Rating | null> {
    return prisma.rating.findUnique(args);
  }

  delete(id: number): Promise<Rating> {
    return prisma.rating.delete({
      where: {
        id
      }
    });
  }
}