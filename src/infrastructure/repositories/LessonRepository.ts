import { Prisma, Lesson } from "@prisma/client";
import { injectable } from "inversify";
import { ILessonRepository } from "../../application/interfaces/IRepositories/ILessonRepository";
import prisma from "../../domain/db";

@injectable()
export class LessonRepository implements ILessonRepository {
  constructor() {}

  count(args: Prisma.LessonCountArgs): Promise<number> {
    return prisma.lesson.count(args)
  }

  findMany(args: Prisma.LessonFindManyArgs): Promise<Lesson[]> {
    return prisma.lesson.findMany(args);
  }

  findUnique(args: Prisma.LessonFindUniqueArgs): Promise<Lesson | null> {
    return prisma.lesson.findUnique(args);
  }

  update(args: Prisma.LessonUpdateArgs): Promise<Lesson> {
    return prisma.lesson.update(args);
  }

  delete(id: number): Promise<Lesson> {
    return prisma.lesson.delete({
      where: {
        id,
      }
    });
  }
}