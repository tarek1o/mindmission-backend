import { ExtendedStudent } from "../../types/ExtendedStudent";
import { IFindBaseRepository } from "./Base/IFindBaseRepository";
import { IUpdateBaseRepository } from "./Base/IUpdateBaseRepository";
import { IDeleteBaseRepository } from "./Base/IDeleteBaseRepository";

export interface IStudentRepository extends IFindBaseRepository<ExtendedStudent>, IUpdateBaseRepository<ExtendedStudent>, IDeleteBaseRepository<ExtendedStudent> {
}