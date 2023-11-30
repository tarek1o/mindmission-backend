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
			throw new APIError('This Course does not exist', HttpStatusCode.BadRequest);
		}
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The Course is retrieved successfully', [Course]));
	});

	createCourse = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {title, shortDescription, description, language, level, imageCover, requirements, courseTeachings, price, discountPercentage, topicId, chapters} = request.body.input;
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
        chapters,
        topic: {
          connect: {
            id: topicId
          }
        },
        instructor: {
          connect: {
            id: request.user?.id
          }
        }
			},
			select,
			include,
		});
		response.status(HttpStatusCode.Created).json(ResponseFormatter.formate(true, 'The Course is created successfully', [createdCourse]));
  });

	updateCourse = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {title, shortDescription, description, language, level, imageCover, requirements, courseTeachings, price, discountPercentage, isApproved, topicId} = request.body.input;
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
        topic: topicId ? {
          connect: {
            id: topicId
          }
        } : undefined,
			},
			select,
			include
		});
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The Course is updated successfully', [updatedCourse]));
	});

	deleteCourse = asyncHandler(async (request: ExtendedRequest, response: Response, next: NextFunction) => {
		const deletedCourse = await this.courseService.delete(+request.params.id);
		response.status(HttpStatusCode.NoContent).json();
	});
}