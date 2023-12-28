import { Prisma, Chapter } from "@prisma/client"
import {inject, injectable } from "inversify"
import slugify from "slugify"
import { IChapterService } from "../interfaces/IServices/IChapterService"
import { IChapterRepository } from "../interfaces/IRepositories/IChapterRepository"
import APIError from "../../presentation/errorHandlers/APIError"
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode"
import { ILessonService } from "../interfaces/IServices/ILessonService"
import { CreateChapter, UpdateChapter } from "../inputs/chapterInput"

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

  async create(args: {data: CreateChapter, select?: Prisma.ChapterSelect, include?: Prisma.ChapterInclude}): Promise<Chapter> {
		const {title, description, order, courseId} = args.data;
		const slug = slugify(title, {lower: true, trim: true});
		const isOrderExist = await this.findFirst({
			where: {
				courseId: courseId,
				order: order
			},
			select: {
				id: true
			}
		});
		if(isOrderExist) {
			throw new APIError('There is already chapter with the same order', HttpStatusCode.BadRequest);
		}
		return this.chapterRepository.create({
			data: {
				title,
				slug,
				order,
				description,
				course: {
					connect: {
						id: courseId
					}
				}
			},
			select: args?.select,
			include: args?.include
		});
	}

	async update(args: {data: UpdateChapter, select?: Prisma.ChapterSelect, include?: Prisma.ChapterInclude}): Promise<Chapter> {
		const {id, title, description, lessons} = args.data;
		const slug = title ? slugify(title.toString(), {lower: true, trim: true}) : undefined;
		if(lessons) {
			const count = await this.lessonService.count({
				where: {
					chapterId: id
				},
			});

			if(count !== lessons.length) {
				throw new APIError("You should send all chapter's lessons during update the order of lessons", HttpStatusCode.BadRequest);
			}
		};
		return this.chapterRepository.update({
			where: {
				id: id
			},
			data: {
				title: title || undefined,
				slug: slug || undefined,
				description:  description || undefined,
				lessons: lessons ? {
					update: lessons.map(({id, order}) => {
						return {
							where: {
								id
							},
							data: {
								order
							}
						}
					})
				} : undefined
			},
			select: args?.select,
			include: args?.include
		});
	}

	delete(id: number): Promise<Chapter> {
		return this.chapterRepository.delete(id);
	};
}