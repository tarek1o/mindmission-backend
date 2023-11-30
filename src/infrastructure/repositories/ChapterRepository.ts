import { Prisma, Chapter } from "@prisma/client";
import { injectable } from "inversify";
import { IChapterRepository } from "../../application/interfaces/IRepositories/IChapterRepository";
import prisma from "../../domain/db";

@injectable()
export class ChapterRepository implements IChapterRepository {
  constructor() {}

  count(args: Prisma.ChapterCountArgs): Promise<number> {
    return prisma.chapter.count(args)
  }

  findMany(args: Prisma.ChapterFindManyArgs): Promise<Chapter[]> {
    return prisma.chapter.findMany(args);
  }

  findUnique(args: Prisma.ChapterFindUniqueArgs): Promise<Chapter | null> {
    return prisma.chapter.findUnique(args);
  }

  update(args: Prisma.ChapterUpdateArgs): Promise<Chapter> {
    return prisma.chapter.update(args);
  }

  delete(id: number): Promise<Chapter> {
    return prisma.chapter.delete({
      where: {
        id,
      }
    });
  }
}