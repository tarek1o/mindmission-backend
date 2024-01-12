import { LessonType, Prisma, Quiz } from "@prisma/client"
import {inject, injectable } from "inversify"
import { IQuizService } from "../interfaces/IServices/IQuizService"
import { ILessonService } from "../interfaces/IServices/ILessonService";
import { ICourseService } from "../interfaces/IServices/ICourseService";
import { IQuizRepository } from "../interfaces/IRepositories/IQuizRepository"
import { Transaction } from "../../infrastructure/services/Transaction";
import { CreateQuiz, UpdateQuiz } from "../inputs/quizInput";
import APIError from "../../presentation/errorHandlers/APIError";
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode";

@injectable()
export class QuizService implements IQuizService {
	constructor(@inject('IQuizRepository') private quizRepository: IQuizRepository, @inject('ILessonService') private lessonService: ILessonService, @inject('ICourseService') private courseService: ICourseService) {}

	private async isLessonTypeIsQuiz(lessonId: number): Promise<boolean> {
		const lesson = await this.lessonService.findUnique({
			where: {
				id: lessonId
			},
			select: {
				lessonType: true
			}
		});

		if(lesson && lesson.lessonType === LessonType.QUIZ) {
			return true;
		}
		return false;
	}

	private async updateCourseInfo(quizId: number, operationType: "create" | "update" | "delete", requiredTime?: number) {
		const quiz = await this.findUnique({
			where: {
				id: quizId
			},
			select: {
				requiredTime: true,
				lesson: {
					select: {
						chapter: {
							select: {
								course: {
									select: {
										id: true,
										hours: true,
										quizzes: true,
									}
								}
							}
						}
					}
				}
			}
		}) as any;
		if(!quiz) {
			throw new APIError("This quiz is not exist", HttpStatusCode.BadRequest);
		}
		let {id, hours, quizzes} = quiz.lesson.chapter.course;
		if(requiredTime && operationType === 'update') {
			requiredTime -= quiz.requiredTime;			
		}
		if(operationType === 'delete') {
			requiredTime = -quiz.requiredTime;
		}
		await this.courseService.update({
			data: {
				id,
				hours: hours + requiredTime,
				quizzes: operationType === "create" ? quizzes + 1 : (operationType === "delete" ? quizzes - 1 : undefined)
			}
		})
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

	async create(args: {data: CreateQuiz, select?: Prisma.QuizSelect, include?: Prisma.QuizInclude}): Promise<Quiz> {
		const {title, description, requiredTime, questions, lessonId} = args.data;
		if(await this.isLessonTypeIsQuiz(lessonId)) {
			throw new APIError("This lesson may be not exist or may be exist but its type is not a quiz", HttpStatusCode.BadRequest);
		}
		return Transaction.transact<Quiz>(async () => {
			const createdQuiz = await this.quizRepository.create({
				data: {
					title,
					requiredTime,
					description,
					questions: {
						createMany: {
							data: questions.map((question, index: number) => {
								return {
									questionText: question.questionText,
									choiceA: question.choiceA,
									choiceB: question.choiceB,
									choiceC: question.choiceC,
									choiceD: question.choiceD,
									correctAnswer: question.correctAnswer,
									order: question.order || index + 1,
									level: question.level
								}
							})
						}
					},
					lesson: {
						connect: {
							id: lessonId
						}
					}
				},
				select: args.select,
				include: args.include
			});
			await this.updateCourseInfo(createdQuiz.id, 'create', requiredTime);
			return createdQuiz; 
		});
	};

	async update(args: {data: UpdateQuiz, select?: Prisma.QuizSelect, include?: Prisma.QuizInclude}): Promise<Quiz> {
		const {id, title, description, requiredTime, questions, lessonId} = args.data;
		if(lessonId && !await this.isLessonTypeIsQuiz(lessonId)) {
			throw new APIError("This lesson may be not exist or may be exist but its type is not a quiz", HttpStatusCode.BadRequest);
		}
		return Transaction.transact<Quiz>(async () => {
			if(requiredTime) {
				await this.updateCourseInfo(id, 'update', requiredTime);
			}
			return this.quizRepository.update({
				where: {
					id,
				},
				data: {
					title: title || undefined,
					requiredTime: requiredTime || undefined,
					description: description || undefined,
					questions: questions && questions.length > 0 ? {
						upsert: questions.map((question, index: number) => {
							return {
								where: {
									id: question.id || 0
								},
								update: {
									questionText: question.questionText || undefined,
									choiceA: question.choiceA || undefined,
									choiceB: question.choiceB || undefined,
									choiceC: question.choiceC || undefined,
									choiceD: question.choiceD || undefined,
									correctAnswer: question.correctAnswer || undefined,
									order: question.order || undefined,
									level: question.level || undefined,
								},
								create: {
									questionText: question.questionText,
									choiceA: question.choiceA,
									choiceB: question.choiceB,
									choiceC: question.choiceC,
									choiceD: question.choiceD,
									correctAnswer: question.correctAnswer,
									order: question.order || index + 1,
									level: question.level
								}
							}
						}) 
					} : undefined,
					lesson: lessonId ? {
						connect: {
							id: lessonId
						}
					} : undefined
				},
				select: args.select,
				include: args.include
			});
		});
	};

	async delete(id: number): Promise<Quiz> {
		return Transaction.transact<Quiz>(async () => {
			await this.updateCourseInfo(id, 'delete');
			return this.quizRepository.delete(id);
		});
	};
}