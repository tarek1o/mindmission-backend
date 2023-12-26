import { Prisma, Course } from "@prisma/client";
import { CreateCourse, UpdateCourse } from "../../inputs/courseInput";

export interface ICourseService {
  aggregate(args: Prisma.CourseAggregateArgs): Promise<Prisma.GetCourseAggregateType<Prisma.CourseAggregateArgs>>
  count(args: Prisma.CourseCountArgs): Promise<number>;
  findMany(args: Prisma.CourseFindManyArgs): Promise<Course[]>;
  findUnique(args: Prisma.CourseFindUniqueArgs): Promise<Course | null>
  create(args: {data: CreateCourse, select?: Prisma.CourseSelect, include?: Prisma.CourseInclude}): Promise<Course>;
  update(args: {data: UpdateCourse, select?: Prisma.CourseSelect, include?: Prisma.CourseInclude}): Promise<Course>;
  delete(id: number): Promise<Course>;
}