import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import asyncHandler from'express-async-handler';
import HttpStatusCode from '../enums/HTTPStatusCode';
import { ICategoryService } from "../../application/interfaces/IServices/ICategoryService";
import { ILogService } from "../../application/interfaces/IServices/ILogService";
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";
import APIError from "../errorHandlers/APIError";
import { RequestManager } from "../services/RequestManager";
import { ExtendedRequest } from "../types/ExtendedRequest";

@injectable()
export class CategoryController {

	constructor(@inject('ICategoryService') private categoryService: ICategoryService, @inject('ILogService') private logService: ILogService) {}

	getAllCategories = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const findOptions = RequestManager.findOptionsWrapper(request);
		const promiseResult = await Promise.all([
			this.categoryService.findMany(findOptions),
			this.categoryService.count({where: findOptions.where})
		]);
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'All categories are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
	});

	getCategoryById = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {		
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const category = await this.categoryService.findUnique({
			where: {
				id: +request.params.id,
			},
			select,
			include
		});
		if(!category) {
			throw new APIError('This category does not exist', HttpStatusCode.BadRequest);
		}
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The category is retrieved successfully', [category]));
	});

	createCategory = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {name, description, type, parentId} = request.body.input;
		const createdCategory = await this.categoryService.create({
			data: {
				name,
				slug: name,
				type,
				description,
				parent: parentId ? {
					connect: {
						id: parentId,
					}
				}: undefined
			},
			select,
			include,
		});
		this.logService.log('ADD', type, createdCategory, request.user);
		response.status(HttpStatusCode.Created).json(ResponseFormatter.formate(true, 'The category is created successfully', [createdCategory]));
	});

	updateCategory = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {name, description, type, parentId} = request.body.input;
		const updatedCategory = await this.categoryService.update({
			where: {
				id: +request.params.id
			},
			data: {
				name,
				description,
				type,
				parent: parentId ? {
					connect: {
						id: parentId,
					}
				} : undefined
			},
			select,
			include,
		});
		this.logService.log('UPDATE', 'CATEGORY', updatedCategory, request.user);
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The category is updated successfully', [updatedCategory]));
	});

	deleteCategory = asyncHandler(async (request: ExtendedRequest, response: Response, next: NextFunction) => {
		const deletedCategory = await this.categoryService.delete(+request.params.id);
		this.logService.log('DELETE', 'CATEGORY', deletedCategory, request.user);
		response.status(HttpStatusCode.NoContent).json();
	});
}