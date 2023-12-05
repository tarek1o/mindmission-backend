import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import asyncHandler from'express-async-handler';
import HttpStatusCode from '../enums/HTTPStatusCode';
import {IChapterService} from "../../application/interfaces/IServices/IChapterService"
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";
import APIError from "../errorHandlers/APIError";
import { RequestManager } from "../services/RequestManager";
import { ExtendedRequest } from "../types/ExtendedRequest";

@injectable()
export class ChapterController {

	constructor(@inject('IChapterService') private chapterService: IChapterService) {}

	getAllChapters = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const findOptions = RequestManager.findOptionsWrapper(request);
		const promiseResult = await Promise.all([
			this.chapterService.findMany(findOptions),
			this.chapterService.count({where: findOptions.where})
		]);
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'All Chapters are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
	});

	getChapterById = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const chapter = await this.chapterService.findUnique({
			where: {
				id: +request.params.id,
			},
			select,
			include
		});
		if(!chapter) {
			throw new APIError('This chapter does not exist', HttpStatusCode.BadRequest);
		}
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The chapter is retrieved successfully', [chapter]));
	});

	createChapter = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {title, description, order, courseId} = request.body.input;
		const createdChapter = await this.chapterService.create({
			data: {
				title,
				slug: title,
				description,
				order,
				course: {
					connect: {
						id: courseId
					}
				}
			},
			select,
			include,
		});
		response.status(HttpStatusCode.Created).json(ResponseFormatter.formate(true, 'The chapter is created successfully', [createdChapter]));
  });

	updateChapter = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {title, description, lessons} = request.body.input;
		const updatedLesson = await this.chapterService.update({
			where: {
				id: +request.params.id
			},
			data: {
				title: title || undefined,
				slug: title || undefined,
				description: description || undefined,
				lessons: lessons && lessons.length > 0 ? {
					update: lessons.map((lesson: {id: number, order: number}) => {
						return {
							where: {
								id: lesson.id,
							},
							data: {
								order: lesson.order
							}
						}
					})
				} : undefined
			},
			select,
			include,
		});
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The chapter is updated successfully', [updatedLesson]));
	});

	deleteChapter = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		await this.chapterService.delete(+request.params.id);
		response.status(HttpStatusCode.NoContent).json();
	});
}