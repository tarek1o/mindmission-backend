import { Prisma, Chapter } from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface IChapterRepository extends IRepository<Chapter> {
  findFirst(args: Prisma.ChapterFindFirstArgs): Promise<Chapter | null>;
}