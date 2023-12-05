import { Prisma, Lesson } from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface ILessonRepository extends IRepository<Lesson> {
  findFirst(args: Prisma.LessonFindFirstArgs): Promise<Lesson | null>
}