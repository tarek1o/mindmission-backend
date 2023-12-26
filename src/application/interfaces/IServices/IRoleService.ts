import { Prisma, Role } from "@prisma/client";
import { CreateRole, UpdateRole } from "../../inputs/roleInput";

export interface IRoleService {
  count(args: Prisma.RoleCountArgs): Promise<number>;
  findMany(args: Prisma.RoleFindManyArgs): Promise<Role[]>;
  findUnique(args: Prisma.RoleFindUniqueArgs): Promise<Role | null>
  create(args: {data: CreateRole, select?: Prisma.RoleSelect, include?: Prisma.RoleInclude}): Promise<Role>;
  update(args: {data: UpdateRole, select?: Prisma.RoleSelect, include?: Prisma.RoleInclude}): Promise<Role>;
  delete(id: number): Promise<Role>;
}