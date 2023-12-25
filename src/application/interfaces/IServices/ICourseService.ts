import { Prisma, Course } from "@prisma/client";

export interface ICourseService {
  aggregate(args: Prisma.CourseAggregateArgs): Promise<Prisma.GetCourseAggregateType<Prisma.CourseAggregateArgs>>
  count(args: Prisma.CourseCountArgs): Promise<number>;
  findMany(args: Prisma.CourseFindManyArgs): Promise<Course[]>;
  findUnique(args: Prisma.CourseFindUniqueArgs): Promise<Course | null>
  create(args: Prisma.CourseCreateArgs): Promise<Course>;
  update(args: Prisma.CourseUpdateArgs): Promise<Course>;
  delete(id: number): Promise<Course>;
}