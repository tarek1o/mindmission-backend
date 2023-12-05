import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { IStudentRepository } from "../../application/interfaces/IRepositories/IStudentRepository";
import prisma from "../../domain/db";
import { ExtendedStudent } from "../../application/types/ExtendedStudent";

@injectable()
export class StudentRepository implements IStudentRepository {
  constructor() {}

  count(args: Prisma.StudentCountArgs): Promise<number> {
    return prisma.student.count(args)
  }

  findMany(args: Prisma.StudentFindManyArgs): Promise<ExtendedStudent[]> {
    return prisma.student.findMany(args);
  }

  findUnique(args: Prisma.StudentFindUniqueArgs): Promise<ExtendedStudent | null> {
    return prisma.student.findUnique(args);
  }

  create(args: Prisma.StudentCreateArgs): Promise<ExtendedStudent> {
    return prisma.student.create(args);
  }

  update(args: Prisma.StudentUpdateArgs): Promise<ExtendedStudent> {
    return prisma.student.update(args);
  }

  delete(id: number): Promise<ExtendedStudent> {
    return prisma.student.delete({
      where: {
        id,
      }
    });
  }
}