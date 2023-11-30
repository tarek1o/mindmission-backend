import { Prisma, Quiz } from "@prisma/client"
import {inject, injectable } from "inversify"
import { IQuizService } from "../interfaces/IServices/IQuizService"
import { IQuizRepository } from "../interfaces/IRepositories/IQuizRepository"

@injectable()
export class QuizService implements IQuizService {
	constructor(@inject('IQuizRepository') private quizRepository: IQuizRepository) {}

	count(args: Prisma.QuizCountArgs): Promise<number> {
		return this.quizRepository.count(args);
	};

	findMany(args: Prisma.QuizFindManyArgs): Promise<Quiz[]> {
		return this.quizRepository.findMany(args);
	};

	findUnique(args: Prisma.QuizFindUniqueArgs): Promise<Quiz | null> {
		return this.quizRepository.findUnique(args);
	};

	async update(args: Prisma.QuizUpdateArgs): Promise<Quiz> {
		return this.quizRepository.update(args);
	}

	delete(id: number): Promise<Quiz> {
		return this.quizRepository.delete(id);
	};
}