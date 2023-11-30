import { Quiz } from "@prisma/client";
import { IFindBaseRepository } from "./Base/IFindBaseRepository";
import { IUpdateBaseRepository } from "./Base/IUpdateBaseRepository";
import { IDeleteBaseRepository } from "./Base/IDeleteBaseRepository";

export interface IQuizRepository extends IFindBaseRepository<Quiz>, IUpdateBaseRepository<Quiz>, IDeleteBaseRepository<Quiz> {
}