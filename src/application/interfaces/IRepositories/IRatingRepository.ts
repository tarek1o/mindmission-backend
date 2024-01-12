import { Prisma, Rating } from "@prisma/client";
import { IFindBaseRepository } from "./Base/IFindBaseRepository";
import { IDeleteBaseRepository } from "./Base/IDeleteBaseRepository";

export interface IRatingRepository extends IFindBaseRepository<Rating>, IDeleteBaseRepository<Rating> {
  aggregate(args: Prisma.RatingAggregateArgs): Promise<Prisma.GetRatingAggregateType<Prisma.RatingAggregateArgs>>
}