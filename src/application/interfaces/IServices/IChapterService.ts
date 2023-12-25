import { Prisma, Chapter } from "@prisma/client";
import { CreateChapter, UpdateChapter } from "../../inputs/chapterInput";

export interface IChapterService {
  count(args: Prisma.ChapterCountArgs): Promise<number>;
  findMany(args: Prisma.ChapterFindManyArgs): Promise<Chapter[]>;
  findUnique(args: Prisma.ChapterFindUniqueArgs): Promise<Chapter | null>
  findFirst(args: Prisma.ChapterFindFirstArgs): Promise<Chapter | null>
  create(args: {data: CreateChapter, select?: Prisma.ChapterSelect, include?: Prisma.ChapterInclude}): Promise<Chapter>;
  update(args: {data: UpdateChapter, select?: Prisma.ChapterSelect, include?: Prisma.ChapterInclude}): Promise<Chapter>;
  delete(id: number): Promise<Chapter>;
}