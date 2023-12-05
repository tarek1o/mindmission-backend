import { Prisma, Article } from "@prisma/client";
import { injectable } from "inversify";
import { IArticleRepository } from "../../application/interfaces/IRepositories/IArticleRepository";
import prisma from "../../domain/db";

@injectable()
export class ArticleRepository implements IArticleRepository {
  constructor() {}

  count(args: Prisma.ArticleCountArgs): Promise<number> {
    return prisma.article.count(args)
  }

  findMany(args: Prisma.ArticleFindManyArgs): Promise<Article[]> {
    return prisma.article.findMany(args);
  }

  findUnique(args: Prisma.ArticleFindUniqueArgs): Promise<Article | null> {
    return prisma.article.findUnique(args);
  }

  create(args: Prisma.ArticleCreateArgs): Promise<Article> {
    return prisma.article.create(args);
  }

  update(args: Prisma.ArticleUpdateArgs): Promise<Article> {
    return prisma.article.update(args);
  }

  delete(id: number): Promise<Article> {
    return prisma.article.delete({
      where: {
        id,
      }
    });
  }
}