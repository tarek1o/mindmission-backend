import { Prisma, Article } from "@prisma/client"
import {inject, injectable } from "inversify"
import { IArticleService } from "../interfaces/IServices/IArticleService"
import { IArticleRepository } from "../interfaces/IRepositories/IArticleRepository"

@injectable()
export class ArticleService implements IArticleService {
	constructor(@inject('IArticleRepository') private articleRepository: IArticleRepository) {}

	count(args: Prisma.ArticleCountArgs): Promise<number> {
		return this.articleRepository.count(args);
	};

	findMany(args: Prisma.ArticleFindManyArgs): Promise<Article[]> {
		return this.articleRepository.findMany(args);
	};

	findUnique(args: Prisma.ArticleFindUniqueArgs): Promise<Article | null> {
		return this.articleRepository.findUnique(args);
	};

	async update(args: Prisma.ArticleUpdateArgs): Promise<Article> {
		return this.articleRepository.update(args);
	}

	delete(id: number): Promise<Article> {
		return this.articleRepository.delete(id);
	};
}