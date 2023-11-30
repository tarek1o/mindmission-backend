import { Lesson } from "@prisma/client";
import { IFindBaseRepository } from "./Base/IFindBaseRepository";
import { IUpdateBaseRepository } from "./Base/IUpdateBaseRepository";
import { IDeleteBaseRepository } from "./Base/IDeleteBaseRepository";

export interface ILessonRepository extends IFindBaseRepository<Lesson>, IUpdateBaseRepository<Lesson>, IDeleteBaseRepository<Lesson> {
}