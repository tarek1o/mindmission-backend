import { Prisma, Chapter } from "@prisma/client";
import { IBaseRepository } from "./Base/IBaseRepository";

export interface IChapterRepository extends IBaseRepository<Chapter> {
  findFirst(args: Prisma.ChapterFindFirstArgs): Promise<Chapter | null>;
}