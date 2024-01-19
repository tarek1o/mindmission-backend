import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import { ExtendedEnrollment } from "../../application/types/ExtendedEnrollment";
import { IEnrollmentRepository } from "../../application/interfaces/IRepositories/IEnrollmentRepository";
import { BaseRepository } from "./Base/BaseRepository";

@injectable()
export class EnrollmentRepository extends BaseRepository<ExtendedEnrollment> implements IEnrollmentRepository {
  constructor() {
    super("Enrollment");
  }
  findFirst(args: Prisma.EnrollmentFindFirstArgs): Promise<ExtendedEnrollment | null> {
    return this.prismaModel.findFirst(args);
  }
}