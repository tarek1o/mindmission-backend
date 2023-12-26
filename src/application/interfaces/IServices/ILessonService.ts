import { Prisma, Lesson } from "@prisma/client";
import { CreateLesson, UpdateLesson } from "../../inputs/lessonInput";

export interface ILessonService {
  count(args: Prisma.LessonCountArgs): Promise<number>;
  findMany(args: Prisma.LessonFindManyArgs): Promise<Lesson[]>;
  findUnique(args: Prisma.LessonFindUniqueArgs): Promise<Lesson | null>
  create(args: {data: CreateLesson, select?: Prisma.LessonSelect, include?: Prisma.LessonInclude}): Promise<Lesson>;
  update(args: {data: UpdateLesson, select?: Prisma.LessonSelect, include?: Prisma.LessonInclude}): Promise<Lesson>;
  delete(id: number): Promise<Lesson>;
}