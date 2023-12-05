import { Prisma, Chapter } from "@prisma/client";

export interface IChapterService {
  count(args: Prisma.ChapterCountArgs): Promise<number>;
  findMany(args: Prisma.ChapterFindManyArgs): Promise<Chapter[]>;
  findUnique(args: Prisma.ChapterFindUniqueArgs): Promise<Chapter | null>
  findFirst(args: Prisma.ChapterFindFirstArgs): Promise<Chapter | null>
  create(args: Prisma.ChapterCreateArgs): Promise<Chapter>;
  update(args: Prisma.ChapterUpdateArgs): Promise<Chapter>;
  delete(id: number): Promise<Chapter>;
}