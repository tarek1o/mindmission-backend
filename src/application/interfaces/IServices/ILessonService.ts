import { Prisma, Lesson } from "@prisma/client";

export interface ILessonService {
  count(args: Prisma.LessonCountArgs): Promise<number>;
  findMany(args: Prisma.LessonFindManyArgs): Promise<Lesson[]>;
  findUnique(args: Prisma.LessonFindUniqueArgs): Promise<Lesson | null>
  create(args: Prisma.LessonCreateArgs): Promise<Lesson>;
  update(args: Prisma.LessonUpdateArgs): Promise<Lesson>;
  delete(id: number): Promise<Lesson>;
}