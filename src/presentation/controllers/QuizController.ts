import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import asyncHandler from'express-async-handler';
import HttpStatusCode from '../enums/HTTPStatusCode';
import {IQuizService} from "../../application/interfaces/IServices/IQuizService"
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";
import APIError from "../errorHandlers/APIError";
import { RequestManager } from "../services/RequestManager";

@injectable()
export class QuizController {

	constructor(@inject('IQuizService') private quizService: IQuizService) {}

	getAllQuizzes = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const findOptions = RequestManager.findOptionsWrapper(request);
		const promiseResult = await Promise.all([
			this.quizService.findMany(findOptions),
			this.quizService.count({where: findOptions.where})
		]);
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'All quizzes are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
	});

	getQuizById = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const quiz = await this.quizService.findUnique({
			where: {
				id: +request.params.id,
			},
			select,
			include
		});
		if(!quiz) {
			throw new APIError('This quiz does not exist', HttpStatusCode.BadRequest);
		}
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The quiz is retrieved successfully', [quiz]));
	});

	createQuiz = asyncHandler(async(request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {title, requiredTime, description, questions, lessonId} = request.body.input;
		const createdQuiz = await this.quizService.create({
			data: {
				title,
				requiredTime,
				description,
				questions: {
					createMany: {
						data: questions.map((question: any, index: number) => {
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
			select,
			include,
		});
		response.status(HttpStatusCode.Created).json(ResponseFormatter.formate(true, 'The quiz is created successfully', [createdQuiz]));
  });

	updateQuiz = asyncHandler(async(request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {title, requiredTime, description, questions, lessonId} = request.body.input;
		const updatedQuiz = await this.quizService.update({
			where: {
				id: +request.params.id,
			},
			data: {
				title: title || undefined,
				requiredTime: requiredTime || undefined,
				description: description || undefined,
				questions: questions && questions.length > 0 ? {
					upsert: questions.map((question: any, index: number) => {
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
			select,
			include,
		});
		response.status(HttpStatusCode.Created).json(ResponseFormatter.formate(true, 'The quiz is updated successfully', [updatedQuiz]));
  });

	deleteQuiz = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		await this.quizService.delete(+request.params.id);
		response.status(HttpStatusCode.NoContent).json();
	});
}