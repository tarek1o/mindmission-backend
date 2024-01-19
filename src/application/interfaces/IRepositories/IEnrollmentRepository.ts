import { IBaseRepository } from "./Base/IBaseRepository";
import { ExtendedEnrollment } from "../../types/ExtendedEnrollment";
import { Prisma } from "@prisma/client";

export interface IEnrollmentRepository extends IBaseRepository<ExtendedEnrollment> {
  findFirst(args: Prisma.EnrollmentFindFirstArgs): Promise<ExtendedEnrollment | null>;
}