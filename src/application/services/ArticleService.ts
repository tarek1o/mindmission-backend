import { Prisma, Article, LessonType } from "@prisma/client"
import {inject, injectable } from "inversify"
import { CreateArticle, UpdateArticle } from "../inputs/articleInput";
import { IArticleService } from "../interfaces/IServices/IArticleService"
import { ILessonService } from "../interfaces/IServices/ILessonService";
import { IArticleRepository } from "../interfaces/IRepositories/IArticleRepository"
import APIError from "../../presentation/errorHandlers/APIError";
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode";

@injectable()
export class ArticleService implements IArticleService {
	constructor(@inject('IArticleRepository') private articleRepository: IArticleRepository, @inject('ILessonService') private lessonService: ILessonService) {}

	private async isLessonTypeIsArticle(lessonId: number) {
		const lesson = await this.lessonService.findUnique({
			where: {
				id: lessonId
			},
			select: {
				lessonType: true
			}
		});

		if(!lesson) {
			throw new APIError('This lesson is not exist', HttpStatusCode.BadRequest);
		}

		if(lesson.lessonType !== LessonType.ARTICLE) {
			throw new APIError('The type of this lesson is not article', HttpStatusCode.BadRequest);
		}
	}

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
		const {lessonId, title, content} = args.data;
		await this.isLessonTypeIsArticle(args.data.lessonId);
		return this.articleRepository.create({
			data: {
				title,
				content,
				lesson: {
					connect: {
						id: lessonId
					}
				}
			},
			select: args.select,
			include: args.include
		});
	}

	async update(args: {data: UpdateArticle, select?: Prisma.ArticleSelect, include?: Prisma.ArticleInclude}): Promise<Article> {
		const {id, lessonId, title, content} = args.data;
		if(lessonId) {
			await this.isLessonTypeIsArticle(lessonId);
		}
		return this.articleRepository.update({
			where: {
				id: id
			},
			data: {
				title: title || undefined,
				content: content || undefined,
				lesson: lessonId ? {
					connect: {
						id: lessonId
					}
				} : undefined
			},
			select: args.select,
			include: args.include
		});
	}

	delete(id: number): Promise<Article> {
		return this.articleRepository.delete(id);
	};
}