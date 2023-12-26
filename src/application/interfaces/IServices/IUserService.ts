import { Prisma } from "@prisma/client";
import { ExtendedUser } from "../../types/ExtendedUser";
import { CreateUser, UpdateUser } from "../../inputs/userInput";

export interface IUserService {
  count(args: Prisma.UserCountArgs): Promise<number>;
  findMany(args: Prisma.UserFindManyArgs): Promise<ExtendedUser[]>;
  findUnique(args: Prisma.UserFindUniqueArgs): Promise<ExtendedUser | null>
  findFirst(args: Prisma.UserFindFirstArgs): Promise<ExtendedUser | null> 
  create(args: {data: CreateUser, select?: Prisma.UserSelect, include?: Prisma.UserInclude}): Promise<ExtendedUser>;
  update(args: {data: UpdateUser, select?: Prisma.UserSelect, include?: Prisma.UserInclude}): Promise<ExtendedUser>;
  delete(id: number): Promise<ExtendedUser>;
}