import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import asyncHandler from'express-async-handler';
import { ICourseService } from "../../application/interfaces/IServices/ICourseService";
import { ExtendedRequest } from "../types/ExtendedRequest";
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";
import { RequestManager } from "../services/RequestManager";
import APIError from "../errorHandlers/APIError";
import HttpStatusCode from '../enums/HTTPStatusCode';

@injectable()
export class CourseController {
	constructor(@inject('ICourseService') private courseService: ICourseService) {}

	courseAggregates = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const {where, skip, take, orderBy} = RequestManager.findOptionsWrapper(request);
		const aggregate = RequestManager.aggregateOptionsWrapper(request);
		const aggregateResult = await this.courseService.aggregate({
			where,
			orderBy,
			skip,
			take,
			...aggregate,
		});
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'Course aggregate results are retrieved successfully', [aggregateResult]));
	});

	getAllCourses = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const findOptions = RequestManager.findOptionsWrapper(request);
		const promiseResult = await Promise.all([
			this.courseService.findMany(findOptions),
			this.courseService.count({where: findOptions.where})
		]);
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'All courses are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
	});

	getCourseById = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {		
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const Course = await this.courseService.findUnique({
			where: {
				id: +request.params.id,
			},
			select,
			include
		});
		if(!Course) {
			throw new APIError('This course does not exist', HttpStatusCode.BadRequest);
		}
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The course is retrieved successfully', [Course]));
	});

	createCourse = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const createdCourse = await this.courseService.create({
			data: {
				...request.body.input,
				userId: request.user?.id
			},
			select,
			include,
		});
		response.status(HttpStatusCode.Created).json(ResponseFormatter.formate(true, 'The course is created successfully', [createdCourse]));
  });

	updateCourse = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const updatedCourse = await this.courseService.update({
			data: {
				...request.body.input,
				id: +request.params.id
			},
			select,
			include
		});
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The course is updated successfully', [updatedCourse]));
	});

	deleteCourse = asyncHandler(async (request: ExtendedRequest, response: Response, next: NextFunction) => {
		await this.courseService.delete(+request.params.id);
		response.status(HttpStatusCode.NoContent).json();
	});
}