import { Prisma } from "@prisma/client";
import { ExtendedStudent } from "../../types/ExtendedStudent";

export interface IStudentService {
  count(args: Prisma.StudentCountArgs): Promise<number>;
  findMany(args: Prisma.StudentFindManyArgs): Promise<ExtendedStudent[]>;
  findUnique(args: Prisma.StudentFindUniqueArgs): Promise<ExtendedStudent | null>
  update(args: Prisma.StudentUpdateArgs): Promise<ExtendedStudent>;
}