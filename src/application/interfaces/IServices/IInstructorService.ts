import { Prisma } from "@prisma/client";
import { ExtendedInstructor } from "../../types/ExtendedInstructor";
import { UpdateInstructor } from "../../inputs/instructorInput";

export interface IInstructorService {
  count(args: Prisma.InstructorCountArgs): Promise<number>;
  findMany(args: Prisma.InstructorFindManyArgs): Promise<ExtendedInstructor[]>;
  findUnique(args: Prisma.InstructorFindUniqueArgs): Promise<ExtendedInstructor | null>
  update(args: {data: UpdateInstructor, select?: Prisma.InstructorSelect, include?: Prisma.InstructorInclude}): Promise<ExtendedInstructor>;
}