import { Prisma, Chapter } from "@prisma/client"
import {inject, injectable } from "inversify"
import slugify from "slugify"
import { IChapterService } from "../interfaces/IServices/IChapterService"
import { IChapterRepository } from "../interfaces/IRepositories/IChapterRepository"
import APIError from "../../presentation/errorHandlers/APIError"
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode"
import { ILessonService } from "../interfaces/IServices/ILessonService"

@injectable()
export class ChapterService implements IChapterService {
	constructor(@inject('IChapterRepository') private chapterRepository: IChapterRepository, @inject('ILessonService') private lessonService: ILessonService) {}

	count(args: Prisma.ChapterCountArgs): Promise<number> {
		return this.chapterRepository.count(args);
	};

	findMany(args: Prisma.ChapterFindManyArgs): Promise<Chapter[]> {
		return this.chapterRepository.findMany(args);
	};

	findUnique(args: Prisma.ChapterFindUniqueArgs): Promise<Chapter | null> {
		return this.chapterRepository.findUnique(args);
	};

	findFirst(args: Prisma.ChapterFindFirstArgs): Promise<Chapter | null> {
		return this.chapterRepository.findFirst(args);
	};

	async create(args: Prisma.ChapterCreateArgs): Promise<Chapter> {
		const isOrderExist = await this.findFirst({
			where: {
				courseId: args.data.course?.connect?.id,
				order: args.data.order
			},
			select: {
				id: true
			}
		});
		if(isOrderExist) {
			throw new APIError('There is already chapter with the same order', HttpStatusCode.BadRequest);
		}
		return this.chapterRepository.create(args);
	}

	async update(args: Prisma.ChapterUpdateArgs): Promise<Chapter> {
    if(args.data.title) {
      args.data.slug = slugify(args.data.title.toString(), {lower: true, trim: true});
    }

		if(args.data.lessons) {
			const count = await this.lessonService.count({
				where: {
					chapterId: args.where.id
				},
			});

			if(count !== (args.data.lessons.update as any).length) {
				throw new APIError("You should send all chapter's lessons during update the order of lessons", HttpStatusCode.BadRequest);
			}
		}
		return this.chapterRepository.update(args);
	}

	delete(id: number): Promise<Chapter> {
		return this.chapterRepository.delete(id);
	};
}