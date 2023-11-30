import { Prisma, Chapter } from "@prisma/client";

export interface IChapterService {
  count(args: Prisma.ChapterCountArgs): Promise<number>;
  findMany(args: Prisma.ChapterFindManyArgs): Promise<Chapter[]>;
  findUnique(args: Prisma.ChapterFindUniqueArgs): Promise<Chapter | null>
  update(args: Prisma.ChapterUpdateArgs): Promise<Chapter>;
  delete(id: number): Promise<Chapter>;
}