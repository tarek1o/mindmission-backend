import { Prisma, Comment } from "@prisma/client"
import { inject, injectable } from "inversify"
import { ICommentService } from "../interfaces/IServices/ICommentService"
import { ICommentRepository } from "../interfaces/IRepositories/ICommentRepository"
import { CreateComment, UpdateComment } from "../inputs/commentInput"

@injectable()
export class CommentService implements ICommentService {
	constructor(@inject('ICommentRepository') private CommentRepository: ICommentRepository) {}

	count(args: Prisma.CommentCountArgs): Promise<number> {
		return this.CommentRepository.count(args);
	};

	findMany(args: Prisma.CommentFindManyArgs): Promise<Comment[]> {
		return this.CommentRepository.findMany(args);
	};

	findUnique(args: Prisma.CommentFindUniqueArgs): Promise<Comment | null> {
		return this.CommentRepository.findUnique(args);
	};

  create(args: {data: CreateComment, select?: Prisma.CommentSelect, include?: Prisma.CommentInclude}): Promise<Comment> {
		const {content, lessonId, parentId, userId} = args.data;	
		return this.CommentRepository.create({
			data: {
        content,
        lesson: {
          connect: {
            id: lessonId,
          }
        },
        parent: parentId ? {
          connect: {
            id: parentId
          }
        } : undefined,
        user: {
          connect: {
            id: userId
          }
        }
			},
			select: args.select,
			include: args.include
    });
	};

	update(args: {data: UpdateComment, select?: Prisma.CommentSelect, include?: Prisma.CommentInclude}): Promise<Comment> {
		const {id, content} = args.data;
		return this.CommentRepository.update({
			where: {
				id
			},
			data: {
				content: content || undefined
			},
			select: args.select,
			include: args.include
		});
	};

	delete(id: number): Promise<Comment> {
		return this.CommentRepository.delete(id);
	};
}