import { Prisma, Quiz } from "@prisma/client";
import { CreateQuiz, UpdateQuiz } from "../../inputs/quizInput";

export interface IQuizService {
  count(args: Prisma.QuizCountArgs): Promise<number>;
  findMany(args: Prisma.QuizFindManyArgs): Promise<Quiz[]>;
  findUnique(args: Prisma.QuizFindUniqueArgs): Promise<Quiz | null>
  create(args: {data: CreateQuiz, select?: Prisma.QuizSelect, include?: Prisma.QuizInclude}): Promise<Quiz>;
  update(args: {data: UpdateQuiz, select?: Prisma.QuizSelect, include?: Prisma.QuizInclude}): Promise<Quiz>;
  delete(id: number): Promise<Quiz>;
}