import { Prisma, Rating } from "@prisma/client";

export interface IRatingService {
  aggregate(args: Prisma.RatingAggregateArgs): Promise<Prisma.GetRatingAggregateType<Prisma.RatingAggregateArgs>>
  count(args: Prisma.RatingCountArgs): Promise<number>;
  findMany(args: Prisma.RatingFindManyArgs): Promise<Rating[]>;
  findUnique(args: Prisma.RatingFindUniqueArgs): Promise<Rating | null>
  delete(id: number): Promise<Rating>;
}