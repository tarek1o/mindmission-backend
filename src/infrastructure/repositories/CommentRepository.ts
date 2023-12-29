import { Prisma, Comment } from "@prisma/client";
import { injectable } from "inversify";
import { ICommentRepository } from "../../application/interfaces/IRepositories/ICommentRepository";
import prisma from "../../domain/db";

@injectable()
export class CommentRepository implements ICommentRepository {
  constructor() {}

  count(args: Prisma.CommentCountArgs): Promise<number> {
    return prisma.comment.count(args)
  }

  findMany(args: Prisma.CommentFindManyArgs): Promise<Comment[]> {
    return prisma.comment.findMany(args);
  }

  findUnique(args: Prisma.CommentFindUniqueArgs): Promise<Comment | null> {
    return prisma.comment.findUnique(args);
  }

  findFirst(args: Prisma.CommentFindFirstArgs): Promise<Comment | null> {
    return prisma.comment.findFirst(args);
  }

  create(args: Prisma.CommentCreateArgs): Promise<Comment> {
    return prisma.comment.create(args);
  }

  update(args: Prisma.CommentUpdateArgs): Promise<Comment> {
    return prisma.comment.update(args);
  }

  delete(id: number): Promise<Comment> {
    return prisma.comment.delete({
      where: {
        id,
      }
    });
  }
}