import { ExtendedStudent } from "../../types/ExtendedStudent";
import { IFindBaseRepository } from "./Base/IFindBaseRepository";
import { IUpdateBaseRepository } from "./Base/IUpdateBaseRepository";
import { IDeleteBaseRepository } from "./Base/IDeleteBaseRepository";
import { Prisma } from "@prisma/client";

export interface IStudentRepository extends IFindBaseRepository<ExtendedStudent>, IUpdateBaseRepository<ExtendedStudent>, IDeleteBaseRepository<ExtendedStudent> {
  findFirst(args: Prisma.StudentFindFirstArgs): Promise<ExtendedStudent | null>;
}