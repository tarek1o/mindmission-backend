import { Prisma, Chapter } from "@prisma/client";
import { injectable } from "inversify";
import { IChapterRepository } from "../../application/interfaces/IRepositories/IChapterRepository";
import prisma from "../../domain/db";
import { BaseRepository } from "./Base/BaseRepository";

@injectable()
export class ChapterRepository extends BaseRepository<Chapter> implements IChapterRepository {
  constructor() {
    super("Chapter");
  }

  findFirst(args: Prisma.ChapterFindFirstArgs): Promise<Chapter | null> {
    return prisma.chapter.findFirst(args);
  };
}