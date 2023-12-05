import { Quiz } from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface IQuizRepository extends IRepository<Quiz> {
}