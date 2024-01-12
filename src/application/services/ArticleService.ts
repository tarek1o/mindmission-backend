import { Prisma, Article, LessonType } from "@prisma/client"
import {inject, injectable } from "inversify"
import { CreateArticle, UpdateArticle } from "../inputs/articleInput";
import { IArticleService } from "../interfaces/IServices/IArticleService"
import { ILessonService } from "../interfaces/IServices/ILessonService";
import { ICourseService } from "../interfaces/IServices/ICourseService";
import { Transaction } from "../../infrastructure/services/Transaction";
import { IArticleRepository } from "../interfaces/IRepositories/IArticleRepository"
import APIError from "../../presentation/errorHandlers/APIError";
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode";

@injectable()
export class ArticleService implements IArticleService {
	constructor(@inject('IArticleRepository') private articleRepository: IArticleRepository, @inject('ILessonService') private lessonService: ILessonService, @inject('ICourseService') private courseService: ICourseService) {}

	private async isLessonTypeIsArticle(lessonId: number) {
		const lesson = await this.lessonService.findUnique({
			where: {
				id: lessonId
			},
			select: {
				lessonType: true,
				chapter: {
					select: {
						courseId: true
					}
				}
			}
		});

		if(lesson && lesson.lessonType === LessonType.ARTICLE) {
			return true;
		}
		return false
	};

	private async updateCourseInfo(articleId: number, operationType: "create" | "update" | "delete", readingTime?: number) {
		const article = await this.findUnique({
			where: {
				id: articleId
			},
			select: {
				readingTime: true,
				lesson: {
					select: {
						chapter: {
							select: {
								course: {
									select: {
										id: true,
										hours: true,
										articles: true,
									}
								}
							}
						}
					}
				}
			}
		}) as any;
		if(!article) {
			throw new APIError("This article is not exist", HttpStatusCode.BadRequest);
		}
		let {id, hours, articles} = article.lesson.chapter.course;
		if(readingTime && operationType === 'update') {
			readingTime -= article.readingTime;			
		}
		if(operationType === 'delete') {
			readingTime = -article.readingTime;
		}
		await this.courseService.update({
			data: {
				id,
				hours: hours + readingTime,
				articles: operationType === "create" ? articles + 1 : (operationType === "delete" ? articles - 1 : undefined)
			}
		})
	};

	count(args: Prisma.ArticleCountArgs): Promise<number> {
		return this.articleRepository.count(args);
	};

	findMany(args: Prisma.ArticleFindManyArgs): Promise<Article[]> {
		return this.articleRepository.findMany(args);
	};

	findUnique(args: Prisma.ArticleFindUniqueArgs): Promise<Article | null> {
		return this.articleRepository.findUnique(args);
	};

	async create(args: {data: CreateArticle, select?: Prisma.ArticleSelect, include?: Prisma.ArticleInclude}): Promise<Article> {
		const {lessonId, title, content, readingTime} = args.data;
		if(!await this.isLessonTypeIsArticle(lessonId)) {
			throw new APIError("This lesson may be not exist or may be exist but its type is not an article", HttpStatusCode.BadRequest);
		}	
		return Transaction.transact<Article>(async () => {
			const createdArticle = await this.articleRepository.create({
				data: {
					title,
					content,
					readingTime,
					lesson: {
						connect: {
							id: lessonId
						}
					}
				},
				select: args.select,
				include: args.include
			});
			await this.updateCourseInfo(createdArticle.id, 'create', readingTime);
			return createdArticle;
		});
	};

	async update(args: {data: UpdateArticle, select?: Prisma.ArticleSelect, include?: Prisma.ArticleInclude}): Promise<Article> {
		const {id, title, content, readingTime, lessonId} = args.data;
		if(lessonId && !await this.isLessonTypeIsArticle(lessonId)) {
			throw new APIError("This lesson may be not exist or may be exist but its type is not an article", HttpStatusCode.BadRequest);
		}
		return Transaction.transact<Article>(async () => {
			if(readingTime) {
				await this.updateCourseInfo(id, 'update', readingTime);
			}
			return this.articleRepository.update({
				where: {
					id: id
				},
				data: {
					title: title || undefined,
					content: content || undefined,
					readingTime: readingTime || undefined,
					lesson: lessonId ? {
						connect: {
							id: lessonId
						}
					} : undefined
				},
				select: args.select,
				include: args.include
			});
		});
	};

	async delete(id: number): Promise<Article> {
		return Transaction.transact<Article>(async () => {
			await this.updateCourseInfo(id, 'delete');
			return this.articleRepository.delete(id);
		})
	};
}