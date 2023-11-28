import { Prisma } from "@prisma/client";
import { ExtendedInstructor } from "../../types/ExtendedInstructor";

export interface IInstructorService {
  count(args: Prisma.InstructorCountArgs): Promise<number>;
  findMany(args: Prisma.InstructorFindManyArgs): Promise<ExtendedInstructor[]>;
  findUnique(args: Prisma.InstructorFindUniqueArgs): Promise<ExtendedInstructor | null>
  update(args: Prisma.InstructorUpdateArgs): Promise<ExtendedInstructor>;
}