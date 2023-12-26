import { Prisma, Course } from "@prisma/client";
import {inject, injectable } from "inversify";
import slugify from "slugify";
import { ICourseRepository } from "../interfaces/IRepositories/ICourseRepository";
import { ICourseService } from "../interfaces/IServices/ICourseService";
import { ICategoryService } from "../interfaces/IServices/ICategoryService";
import { IChapterService } from "../interfaces/IServices/IChapterService";
import { CreateCourse, UpdateCourse } from "../inputs/courseInput";
import APIError from "../../presentation/errorHandlers/APIError";
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode";

@injectable()
export class CourseService implements ICourseService {
	constructor(@inject('ICourseRepository') private courseRepository: ICourseRepository, @inject('ICategoryService') private categoryService: ICategoryService, @inject('IChapterService') private chapterService: IChapterService) {}

	async isTrueTopic(id: number): Promise<boolean> {
		const topic = await this.categoryService.findUnique({
			where: {
				id
			},
			select: {
				type: true
			}
		})

		if(topic && topic.type === 'TOPIC') {
			return true;
		}
		return false;
	}

  aggregate(args: Prisma.CourseAggregateArgs): Promise<Prisma.GetCourseAggregateType<Prisma.CourseAggregateArgs>> {
    return this.courseRepository.aggregate(args);
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

  async create(args: {data: CreateCourse, select?: Prisma.CourseSelect, include?: Prisma.CourseInclude}): Promise<Course> {
    const {title, shortDescription, description, language, level, imageCover, requirements, courseTeachings, price, isDraft, userId, topicId} = args.data;
		const slug = slugify(title, {lower: true, trim: true});
		if(!await this.isTrueTopic(topicId)) {
			throw new APIError("This topic may be not exist or may be exist but not a topic", HttpStatusCode.BadRequest);
		}
		return this.courseRepository.create({
			data: {
				title,
				slug,
				shortDescription,
				description,
				language,
				level,
				imageCover,
				requirements,
				courseTeachings,
				price,
				isDraft,
				instructor: {
					connect: {
						userId
					}
				},
				topic: {
					connect: {
						id: topicId
					}
				}
			},
			select: args.select,
			included: args.include
		});
	};

	async update(args: {data: UpdateCourse, select?: Prisma.CourseSelect, include?: Prisma.CourseInclude}): Promise<Course> {
    const {id, title, shortDescription, description, language, level, imageCover, requirements, courseTeachings, price, discountPercentage, isApproved, isDraft, chapters, topicId} = args.data;
		const slug = title ? slugify(title.toString(), {lower: true, trim: true}) : undefined;
		if(topicId && !await this.isTrueTopic(topicId)) {
			throw new APIError("This topic may be not exist or may be exist but not a topic", HttpStatusCode.BadRequest);
		}
		if(chapters) {
			const count = await this.chapterService.count({
				where: {
					courseId: id
				},
			});

			if(count !== chapters.length) {
				throw new APIError("You should send all course's chapters during update the order of chapters", HttpStatusCode.BadRequest);
			}
		}
		return this.courseRepository.update({
			where: {
				id
			},
			data: {
				title : title || undefined,
				slug,
        shortDescription: shortDescription || undefined,
        description: description || undefined,
        language: language || undefined,
        level: level || undefined,
        imageCover: imageCover || undefined,
        requirements: requirements || undefined,
        courseTeachings: courseTeachings || undefined,
        price: price || undefined,
        discountPercentage: discountPercentage || undefined,
        isApproved: isApproved || undefined,
				isDraft: isDraft || undefined,
				chapters: chapters ? {
					update: chapters.map(({id, order}) => {
						return {
							where: {
								id
							},
							data: {
								order
							}
						}
					})
				} : undefined,
        topic: topicId ? {
          connect: {
            id: topicId
          }
        } : undefined,
			},
			select: args.select,
			include: args.include
		});
	};

	delete(id: number): Promise<Course> {
		return this.courseRepository.delete(id);
	};
}