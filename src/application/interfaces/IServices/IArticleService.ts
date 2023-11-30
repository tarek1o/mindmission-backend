import { Prisma, Article } from "@prisma/client";

export interface IArticleService {
  count(args: Prisma.ArticleCountArgs): Promise<number>;
  findMany(args: Prisma.ArticleFindManyArgs): Promise<Article[]>;
  findUnique(args: Prisma.ArticleFindUniqueArgs): Promise<Article | null>
  update(args: Prisma.ArticleUpdateArgs): Promise<Article>;
  delete(id: number): Promise<Article>;
}