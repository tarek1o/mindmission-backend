import { Article } from "@prisma/client";
import { IFindBaseRepository } from "./Base/IFindBaseRepository";
import { IUpdateBaseRepository } from "./Base/IUpdateBaseRepository";
import { IDeleteBaseRepository } from "./Base/IDeleteBaseRepository";

export interface IArticleRepository extends IFindBaseRepository<Article>, IUpdateBaseRepository<Article>, IDeleteBaseRepository<Article> {
}