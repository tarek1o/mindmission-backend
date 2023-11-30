import { Chapter } from "@prisma/client";
import { IFindBaseRepository } from "./Base/IFindBaseRepository";
import { IUpdateBaseRepository } from "./Base/IUpdateBaseRepository";
import { IDeleteBaseRepository } from "./Base/IDeleteBaseRepository";

export interface IChapterRepository extends IFindBaseRepository<Chapter>, IUpdateBaseRepository<Chapter>, IDeleteBaseRepository<Chapter> {
}