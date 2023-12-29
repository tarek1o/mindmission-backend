import { Prisma, Comment } from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface ICommentRepository extends IRepository<Comment> {
  findFirst(args: Prisma.CommentFindFirstArgs): Promise<Comment | null>;
}