import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import asyncHandler from'express-async-handler';
import HttpStatusCode from '../enums/HTTPStatusCode';
import { ICourseService } from "../../application/interfaces/IServices/ICourseService";
import { ILogService } from "../../application/interfaces/IServices/ILogService";
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";
import APIError from "../errorHandlers/APIError";
import { RequestManager } from "../services/RequestManager";
import { ExtendedRequest } from "../types/ExtendedRequest";

@injectable()
export class CourseController {

	constructor(@inject('ICourseService') private courseService: ICourseService, @inject('ILogService') private logService: ILogService) {}

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
		const {title, shortDescription, description, language, level, imageCover, requirements, courseTeachings, price, discountPercentage, topicId} = request.body.input;
		const createdCourse = await this.courseService.create({
			data: {
				title,
				slug: title,
        shortDescription,
        description,
        language,
        level,
        imageCover,
        requirements,
        courseTeachings,
        price,
        discountPercentage,
        isApproved: false,
				isDraft: true,
        topic: {
          connect: {
            id: topicId
          }
        },
        instructor: {
          connect: {
						userId: request.user?.id
          }
        }
			},
			select,
			include,
		});
		response.status(HttpStatusCode.Created).json(ResponseFormatter.formate(true, 'The course is created successfully', [createdCourse]));
  });

	updateCourse = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {title, shortDescription, description, language, level, imageCover, requirements, courseTeachings, price, discountPercentage, isApproved, isDraft, chapters, topicId} = request.body.input;
		const updatedCourse = await this.courseService.update({
			where: {
				id: +request.params.id
			},
			data: {
				title : title || undefined,
				slug: title || undefined,
        shortDescription: shortDescription || undefined,
        description: description || undefined,
        language: language || undefined,
        level: level || undefined,
        imageCover: imageCover || undefined,
        requirements: requirements || undefined,
        courseTeachings: courseTeachings || undefined,
        price: price || undefined,
        discountPercentage: discountPercentage || undefined,
        isApproved: isApproved || undefined,
				isDraft: isDraft || undefined,
				chapters: chapters ? {
					update: chapters.map((chapters: {id: number, order: number}) => {
						return {
							where: {
								id: chapters.id
							},
							data: {
								order: chapters.order
							}
						}
					})
				} : undefined,
        topic: topicId ? {
          connect: {
            id: topicId
          }
        } : undefined,
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