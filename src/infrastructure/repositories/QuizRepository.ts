import { Prisma, Quiz } from "@prisma/client";
import { injectable } from "inversify";
import { IQuizRepository } from "../../application/interfaces/IRepositories/IQuizRepository";
import prisma from "../../domain/db";

@injectable()
export class QuizRepository implements IQuizRepository {
  constructor() {}

  count(args: Prisma.QuizCountArgs): Promise<number> {
    return prisma.quiz.count(args)
  }

  findMany(args: Prisma.QuizFindManyArgs): Promise<Quiz[]> {
    return prisma.quiz.findMany(args);
  }

  findUnique(args: Prisma.QuizFindUniqueArgs): Promise<Quiz | null> {
    return prisma.quiz.findUnique(args);
  }

  update(args: Prisma.QuizUpdateArgs): Promise<Quiz> {
    return prisma.quiz.update(args);
  }

  delete(id: number): Promise<Quiz> {
    return prisma.quiz.delete({
      where: {
        id,
      }
    });
  }
}