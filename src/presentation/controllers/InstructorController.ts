import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import asyncHandler from'express-async-handler';
import HttpStatusCode from '../enums/HTTPStatusCode';
import {IInstructorService} from "../../application/interfaces/IServices/IInstructorService"
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";
import APIError from "../errorHandlers/APIError";
import { RequestManager } from "../services/RequestManager";
import { ExtendedRequest } from "../types/ExtendedRequest";

@injectable()
export class InstructorController {

	constructor(@inject('IInstructorService') private instructorService: IInstructorService) {}

	getAllInstructors = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const findOptions = RequestManager.findOptionsWrapper(request);
		const promiseResult = await Promise.all([
			this.instructorService.findMany(findOptions),
			this.instructorService.count({where: findOptions.where})
		]);
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'All instructors are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
	});

	getInstructorById = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const instructor = await this.instructorService.findUnique({
			where: {
				id: +request.params.id,
			},
			select,
			include
		});
		if(!instructor) {
			throw new APIError('This instructor does not exist', HttpStatusCode.BadRequest);
		}
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The instructor is retrieved successfully', [instructor]));
	});

	updateInstructor = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {bref, specialization, skills} = request.body.input;
		const updatedInstructor = await this.instructorService.update({
			where: {
				id: +request.params.id
			},
			data: {
				bref: bref || undefined,
        specialization: specialization || undefined,
        skills: skills || undefined,
			},
			select,
			include,
		});
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The instructor is updated successfully', [updatedInstructor]));
	});
}