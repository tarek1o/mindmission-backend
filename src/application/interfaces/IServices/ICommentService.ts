import { Prisma, Comment } from "@prisma/client";
import { CreateComment, UpdateComment } from "../../inputs/commentInput";

export interface ICommentService {
  count(args: Prisma.CommentCountArgs): Promise<number>;
  findMany(args: Prisma.CommentFindManyArgs): Promise<Comment[]>;
  findUnique(args: Prisma.CommentFindUniqueArgs): Promise<Comment | null>
  create(args: {data: CreateComment, select?: Prisma.CommentSelect, include?: Prisma.CommentInclude}): Promise<Comment>;
  update(args: {data: UpdateComment, select?: Prisma.CommentSelect, include?: Prisma.CommentInclude}): Promise<Comment>;
  delete(id: number): Promise<Comment>;
}