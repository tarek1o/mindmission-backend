import { Course, Prisma} from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface ICourseRepository extends IRepository<Course> {
  aggregate(args: Prisma.CourseAggregateArgs): Prisma.PrismaPromise<Prisma.GetCourseAggregateType<any>>
}