import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import asyncHandler from'express-async-handler';
import {IChapterService} from "../../application/interfaces/IServices/IChapterService"
import { ExtendedRequest } from "../types/ExtendedRequest";
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";
import { RequestManager } from "../services/RequestManager";
import APIError from "../errorHandlers/APIError";
import HttpStatusCode from '../enums/HTTPStatusCode';

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
		const createdChapter = await this.chapterService.create({data: request.body.input, select, include});
		response.status(HttpStatusCode.Created).json(ResponseFormatter.formate(true, 'The chapter is created successfully', [createdChapter]));
  });

	updateChapter = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const updatedLesson = await this.chapterService.update({data: {...request.body.input, id: +request.params.id}, select, include});
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The chapter is updated successfully', [updatedLesson]));
	});

	deleteChapter = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		await this.chapterService.delete(+request.params.id);
		response.status(HttpStatusCode.NoContent).json();
	});
}