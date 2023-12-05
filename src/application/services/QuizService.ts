import { LessonType, Prisma, Quiz } from "@prisma/client"
import {inject, injectable } from "inversify"
import { IQuizService } from "../interfaces/IServices/IQuizService"
import { ILessonService } from "../interfaces/IServices/ILessonService";
import { IQuizRepository } from "../interfaces/IRepositories/IQuizRepository"
import APIError from "../../presentation/errorHandlers/APIError";
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode";

@injectable()
export class QuizService implements IQuizService {
	constructor(@inject('IQuizRepository') private quizRepository: IQuizRepository, @inject('ILessonService') private lessonService: ILessonService) {}

	private async isLessonTypeIsQuiz(lessonId: number) {
		const lesson = await this.lessonService.findUnique({
			where: {
				id: lessonId
			},
			select: {
				lessonType: true
			}
		});

		if(!lesson) {
			throw new APIError('This lesson is not exist', HttpStatusCode.BadRequest);
		}

		if(lesson.lessonType !== LessonType.QUIZ) {
			throw new APIError('The type of this lesson is not quiz', HttpStatusCode.BadRequest);
		}
	}

	count(args: Prisma.QuizCountArgs): Promise<number> {
		return this.quizRepository.count(args);
	};

	findMany(args: Prisma.QuizFindManyArgs): Promise<Quiz[]> {
		return this.quizRepository.findMany(args);
	};

	findUnique(args: Prisma.QuizFindUniqueArgs): Promise<Quiz | null> {
		return this.quizRepository.findUnique(args);
	};

	async create(args: Prisma.QuizCreateArgs): Promise<Quiz> {
		await this.isLessonTypeIsQuiz(args.data.lesson?.connect?.id as number);
		return this.quizRepository.create(args);
	}

	async update(args: Prisma.QuizUpdateArgs): Promise<Quiz> {
		if(args.data.lesson?.connect?.id) {
			await this.isLessonTypeIsQuiz(args.data.lesson.connect.id);
		}
		return this.quizRepository.update(args);
	}

	delete(id: number): Promise<Quiz> {
		return this.quizRepository.delete(id);
	};
}