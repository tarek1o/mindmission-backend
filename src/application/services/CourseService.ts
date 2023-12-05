import { Prisma, Course, LessonType } from "@prisma/client";
import {inject, injectable } from "inversify";
import slugify from "slugify";
import { ICourseRepository } from "../interfaces/IRepositories/ICourseRepository";
import { ICourseService } from "../interfaces/IServices/ICourseService";
import { ICategoryService } from "../interfaces/IServices/ICategoryService";
import { IChapterService } from "../interfaces/IServices/IChapterService";
import APIError from "../../presentation/errorHandlers/APIError";
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode";

@injectable()
export class CourseService implements ICourseService {
	constructor(@inject('ICourseRepository') private courseRepository: ICourseRepository, @inject('ICategoryService') private categoryService: ICategoryService, @inject('IChapterService') private chapterService: IChapterService) {}

	async isTrueTopic(id: number) {
		const topic = await this.categoryService.findUnique({
			where: {
				id
			},
			select: {
				type: true
			}
		})

		if(!topic) {
			throw new APIError("This topic is not exist", HttpStatusCode.BadRequest);
		}

		if(topic.type !== 'TOPIC') {
			throw new APIError(`Any course must belongs to topic not ${topic.type.toLowerCase()}`, HttpStatusCode.BadRequest);
		}
	}

	count(args: Prisma.CourseCountArgs): Promise<number> {
		return this.courseRepository.count(args);
	};

	findMany(args: Prisma.CourseFindManyArgs): Promise<Course[]> {
		return this.courseRepository.findMany(args);
	};

	findUnique(args: Prisma.CourseFindUniqueArgs): Promise<Course | null> {
		return this.courseRepository.findUnique(args);
	};

	async create(args: Prisma.CourseCreateArgs): Promise<Course> {
    args.data.slug = slugify(args.data.title, {lower: true, trim: true});
		await this.isTrueTopic(args.data.topic?.connect?.id as number);
		return this.courseRepository.create(args);
	};

	async update(args: Prisma.CourseUpdateArgs): Promise<Course> {
    if(args.data.title) {
      args.data.slug = slugify(args.data.title.toString(), {lower: true, trim: true});
    }

		if(args.data.topic?.connect?.id) {
			await this.isTrueTopic(args.data.topic.connect.id);
		}

		if(args.data.chapters) {
			const count = await this.chapterService.count({
				where: {
					courseId: args.where.id
				},
			});

			if(count !== (args.data.chapters.update as any).length) {
				throw new APIError("You should send all course's chapters during update the order of chapters", HttpStatusCode.BadRequest);
			}
		}

		return this.courseRepository.update(args);
	};

	delete(id: number): Promise<Course> {
		return this.courseRepository.delete(id);
	};
}