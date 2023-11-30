import { Prisma, Quiz } from "@prisma/client";

export interface IQuizService {
  count(args: Prisma.QuizCountArgs): Promise<number>;
  findMany(args: Prisma.QuizFindManyArgs): Promise<Quiz[]>;
  findUnique(args: Prisma.QuizFindUniqueArgs): Promise<Quiz | null>
  update(args: Prisma.QuizUpdateArgs): Promise<Quiz>;
  delete(id: number): Promise<Quiz>;
}