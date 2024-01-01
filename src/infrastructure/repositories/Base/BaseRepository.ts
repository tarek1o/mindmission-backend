import { Prisma } from "@prisma/client";
import { injectable, unmanaged } from "inversify";
import { IBaseRepository } from "../../../application/interfaces/IRepositories/Base/IBaseRepository";
import prisma from "../../../domain/db";

@injectable()
export class BaseRepository<T> implements IBaseRepository<T> {
  private prismaModel!: any;
  constructor(@unmanaged() private modelName: Prisma.ModelName) {
    this.prismaModel = prisma[this.modelName.toLowerCase()[0] + this.modelName.slice(1) as any];
  }

  count(args: any): Promise<number> {
    return this.prismaModel.count(args)
  }

  findMany(args: any): Promise<T[]> {
    return this.prismaModel.findMany(args);
  }

  findUnique(args: any): Promise<T | null> {
    return this.prismaModel.findUnique(args);
  }

  create(args: any): Promise<T> {
    return this.prismaModel.create(args);
  }

  update(args: any): Promise<T> {
    return this.prismaModel.update(args);
  }

  delete(id: number): Promise<T> {
    return this.prismaModel.delete({
      where: {
        id,
      }
    });
  }
}