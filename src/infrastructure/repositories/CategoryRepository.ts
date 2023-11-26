import { Prisma, Category } from "@prisma/client";
import { injectable } from "inversify";
import { ICategoryRepository } from "../../application/interfaces/IRepositories/ICategoryRepository";
import prisma from "../../domain/db";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor() {}

  count(args: Prisma.CategoryCountArgs): Promise<number> {
    return prisma.category.count(args)
  }

  findMany(args: Prisma.CategoryFindManyArgs): Promise<Category[]> {
    return prisma.category.findMany(args);
  }

  findUnique(args: Prisma.CategoryFindUniqueArgs): Promise<Category | null> {
    return prisma.category.findUnique(args);
  }

  create(args: Prisma.CategoryCreateArgs): Promise<Category> {
    return prisma.category.create(args);
  }

  update(args: Prisma.CategoryUpdateArgs): Promise<Category> {
    return prisma.category.update(args);
  }

  delete(id: number): Promise<Category> {
    return prisma.category.delete({
      where: {
        id,
      }
    });
  }
}