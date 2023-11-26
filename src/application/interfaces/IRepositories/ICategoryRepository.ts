import { Category } from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface ICategoryRepository extends IRepository<Category> {
}