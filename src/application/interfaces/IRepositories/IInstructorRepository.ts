import { ExtendedInstructor } from "../../types/ExtendedInstructor";
import { IFindBaseRepository } from "./Base/IFindBaseRepository";
import { IUpdateBaseRepository } from "./Base/IUpdateBaseRepository";
import { IDeleteBaseRepository } from "./Base/IDeleteBaseRepository";

export interface IInstructorRepository extends IFindBaseRepository<ExtendedInstructor>, IUpdateBaseRepository<ExtendedInstructor>, IDeleteBaseRepository<ExtendedInstructor> {
}