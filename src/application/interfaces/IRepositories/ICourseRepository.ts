import { Course } from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface ICourseRepository extends IRepository<Course> {
}