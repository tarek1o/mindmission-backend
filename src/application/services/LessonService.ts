import { Prisma, Lesson } from "@prisma/client"
import {inject, injectable } from "inversify"
import slugify from "slugify"
import { ILessonService } from "../interfaces/IServices/ILessonService"
import { ILessonRepository } from "../interfaces/IRepositories/ILessonRepository"
import { CreateLesson, UpdateLesson } from "../inputs/lessonInput"
import APIError from "../../presentation/errorHandlers/APIError"
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode"

@injectable()
export class LessonService implements ILessonService {
	constructor(@inject('ILessonRepository') private lessonRepository: ILessonRepository) {}

	count(args: Prisma.LessonCountArgs): Promise<number> {
		return this.lessonRepository.count(args);
	};

	findMany(args: Prisma.LessonFindManyArgs): Promise<Lesson[]> {
		return this.lessonRepository.findMany(args);
	};

	findUnique(args: Prisma.LessonFindUniqueArgs): Promise<Lesson | null> {
		return this.lessonRepository.findUnique(args);
	};

	async create(args: {data: CreateLesson, select?: Prisma.LessonSelect, include?: Prisma.LessonInclude}): Promise<Lesson> {
		const {title, order, lessonType, attachment, isFree, chapterId} = args.data;
		const slug = slugify(args.data.title.toString(), {lower: true, trim: true});
		const isOrderIsFound = await this.lessonRepository.findFirst({
			where: {
				order,
				chapterId
			},
			select: {
				id: true
			}
		});
		if(isOrderIsFound) {
			throw new APIError("There is another lesson with the same order ", HttpStatusCode.BadRequest);
		}
		return this.lessonRepository.create({
			data: {
				title,
				slug,
				order,
				lessonType,
				attachment,
				isFree,
				chapter: {
					connect: {
						id: chapterId
					}
				}
			},	
			select: args.select,
			include: args.include
		});
	};

	async update(args: {data: UpdateLesson, select?: Prisma.LessonSelect, include?: Prisma.LessonInclude}): Promise<Lesson> {
    const {id, title, attachment, isFree, lessonType} = args.data;
		const slug = title ? slugify(title.toString(), {lower: true, trim: true}) : undefined;
		return this.lessonRepository.update({
			where: {
				id
			},
			data: {
				title: title || undefined,
				slug: slug || undefined,
				attachment: attachment || undefined,
				isFree: isFree || undefined,
				lessonType: lessonType || undefined
			},
			select: args.select,
			include: args.include
		});
	};

	delete(id: number): Promise<Lesson> {
		return this.lessonRepository.delete(id);
	};
}