import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { IInstructorRepository } from "../../application/interfaces/IRepositories/IInstructorRepository";
import prisma from "../../domain/db";
import { ExtendedInstructor } from "../../application/types/ExtendedInstructor";

@injectable()
export class InstructorRepository implements IInstructorRepository {
  constructor() {}

  count(args: Prisma.InstructorCountArgs): Promise<number> {
    return prisma.instructor.count(args)
  }

  findMany(args: Prisma.InstructorFindManyArgs): Promise<ExtendedInstructor[]> {
    return prisma.instructor.findMany(args);
  }

  findUnique(args: Prisma.InstructorFindUniqueArgs): Promise<ExtendedInstructor | null> {
    return prisma.instructor.findUnique(args);
  }

  update(args: Prisma.InstructorUpdateArgs): Promise<ExtendedInstructor> {
    return prisma.instructor.update(args);
  }
}