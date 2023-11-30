import { Prisma, Course } from "@prisma/client";
import { injectable } from "inversify";
import { ICourseRepository } from "../../application/interfaces/IRepositories/ICourseRepository";
import prisma from "../../domain/db";

@injectable()
export class CourseRepository implements ICourseRepository {
  constructor() {}

  count(args: Prisma.CourseCountArgs): Promise<number> {
    return prisma.course.count(args)
  }

  findMany(args: Prisma.CourseFindManyArgs): Promise<Course[]> {
    return prisma.course.findMany(args);
  }

  findUnique(args: Prisma.CourseFindUniqueArgs): Promise<Course | null> {
    return prisma.course.findUnique(args);
  }

  create(args: Prisma.CourseCreateArgs): Promise<Course> {
    return prisma.course.create(args);
  }

  update(args: Prisma.CourseUpdateArgs): Promise<Course> {
    return prisma.course.update(args);
  }

  delete(id: number): Promise<Course> {
    return prisma.course.delete({
      where: {
        id,
      }
    });
  }
}