import { Prisma, Article } from "@prisma/client";
import { CreateArticle, UpdateArticle } from "../../inputs/articleInput";

export interface IArticleService {
  count(args: Prisma.ArticleCountArgs): Promise<number>;
  findMany(args: Prisma.ArticleFindManyArgs): Promise<Article[]>;
  findUnique(args: Prisma.ArticleFindUniqueArgs): Promise<Article | null>
  create(args: {data: CreateArticle, select?: Prisma.ArticleSelect, include?: Prisma.ArticleInclude}): Promise<Article>;
  update(args: {data: UpdateArticle, select?: Prisma.ArticleSelect, include?: Prisma.ArticleInclude}): Promise<Article>;
  delete(id: number): Promise<Article>;
}