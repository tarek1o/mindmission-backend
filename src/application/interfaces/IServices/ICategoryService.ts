import { Prisma, Category } from "@prisma/client";
import { CreateCategory, UpdateCategory } from "../../inputs/categoryInput";

export interface ICategoryService {
  count(args: Prisma.CategoryCountArgs): Promise<number>;
  findMany(args: Prisma.CategoryFindManyArgs): Promise<Category[]>;
  findUnique(args: Prisma.CategoryFindUniqueArgs): Promise<Category | null>
  create(args: {data: CreateCategory, select?: Prisma.CategorySelect, include?: Prisma.CategoryInclude}): Promise<Category>;
  update(args: {data: UpdateCategory, select?: Prisma.CategorySelect, include?: Prisma.CategoryInclude}): Promise<Category>;
  delete(id: number): Promise<Category>;
};