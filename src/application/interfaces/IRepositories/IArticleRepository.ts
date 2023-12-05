import { Article } from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface IArticleRepository extends IRepository<Article> {
}