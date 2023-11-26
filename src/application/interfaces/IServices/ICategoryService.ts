import { Prisma, Category } from "@prisma/client";

export interface ICategoryService {
  count(args: Prisma.CategoryCountArgs): Promise<number>;
  findMany(args: Prisma.CategoryFindManyArgs): Promise<Category[]>;
  findUnique(args: Prisma.CategoryFindUniqueArgs): Promise<Category | null>
  create(args: Prisma.CategoryCreateArgs): Promise<Category>;
  update(args: Prisma.CategoryUpdateArgs): Promise<Category>;
  delete(id: number): Promise<Category>;
}