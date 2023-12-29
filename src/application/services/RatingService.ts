import { Prisma, Rating } from "@prisma/client"
import { inject, injectable } from "inversify"
import { IRatingRepository } from "../interfaces/IRepositories/IRatingRepository";
import { IRatingService } from "../interfaces/IServices/IRatingService";

@injectable()
export class RatingService implements IRatingService {
	constructor(@inject('IRatingRepository') private ratingRepository: IRatingRepository) {}

	count(args: Prisma.RatingCountArgs): Promise<number> {
		return this.ratingRepository.count(args);
	};

	findMany(args: Prisma.RatingFindManyArgs): Promise<Rating[]> {
		return this.ratingRepository.findMany(args);
	};

	findUnique(args: Prisma.RatingFindUniqueArgs): Promise<Rating | null> {
		return this.ratingRepository.findUnique(args);
	};

	delete(id: number): Promise<Rating> {
    return this.ratingRepository.delete(id);
  }
}