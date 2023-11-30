import { Prisma, Lesson } from "@prisma/client"
import {inject, injectable } from "inversify"
import slugify from "slugify"
import { ILessonService } from "../interfaces/IServices/ILessonService"
import { ILessonRepository } from "../interfaces/IRepositories/ILessonRepository"

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

	async update(args: Prisma.LessonUpdateArgs): Promise<Lesson> {
    if(args.data.title) {
      args.data.slug = slugify(args.data.title.toString(), {lower: true, trim: true});
    }
		return this.lessonRepository.update(args);
	}

	delete(id: number): Promise<Lesson> {
		return this.lessonRepository.delete(id);
	};
}