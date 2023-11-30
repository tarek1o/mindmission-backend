import { Prisma, Chapter } from "@prisma/client"
import {inject, injectable } from "inversify"
import slugify from "slugify"
import { IChapterService } from "../interfaces/IServices/IChapterService"
import { IChapterRepository } from "../interfaces/IRepositories/IChapterRepository"

@injectable()
export class ChapterService implements IChapterService {
	constructor(@inject('IChapterRepository') private chapterRepository: IChapterRepository) {}

	count(args: Prisma.ChapterCountArgs): Promise<number> {
		return this.chapterRepository.count(args);
	};

	findMany(args: Prisma.ChapterFindManyArgs): Promise<Chapter[]> {
		return this.chapterRepository.findMany(args);
	};

	findUnique(args: Prisma.ChapterFindUniqueArgs): Promise<Chapter | null> {
		return this.chapterRepository.findUnique(args);
	};

	async update(args: Prisma.ChapterUpdateArgs): Promise<Chapter> {
    if(args.data.title) {
      args.data.slug = slugify(args.data.title.toString(), {lower: true, trim: true});
    }
		return this.chapterRepository.update(args);
	}

	delete(id: number): Promise<Chapter> {
		return this.chapterRepository.delete(id);
	};
}