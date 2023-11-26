import { Prisma, Category, CategoryType } from "@prisma/client"
import {inject, injectable } from "inversify"
import slugify from "slugify"
import { ICategoryService } from "../interfaces/IServices/ICategoryService"
import { ICategoryRepository } from "../interfaces/IRepositories/ICategoryRepository"
import APIError from "../../presentation/errorHandlers/APIError"
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode"

@injectable()
export class CategoryService implements ICategoryService {
	constructor(@inject('ICategoryRepository') private categoryRepository: ICategoryRepository) {}
	
	private parentChild = {
		[CategoryType.CATEGORY]: undefined,
		[CategoryType.SUBCATEGORY]: CategoryType.CATEGORY,
		[CategoryType.TOPIC]: CategoryType.SUBCATEGORY
	}

	private async isCorrectParent(type: CategoryType, parentId: number | null | undefined): Promise<boolean> {
		const parentType = this.parentChild[type];
		if(!parentId && !parentType) {
			return true;
		}
		else if(parentId && parentType) {
			const parent = await this.categoryRepository.findUnique({
				where: {
					id: parentId,
				},
				select: {
					type: true
				}
			});
	
			if(parent && parent.type === parentType) {
				return true;
			};
		}
		return false;
	}

	count(args: Prisma.CategoryCountArgs): Promise<number> {
		return this.categoryRepository.count(args);
	};

	findMany(args: Prisma.CategoryFindManyArgs): Promise<Category[]> {
		return this.categoryRepository.findMany(args);
	};

	findUnique(args: Prisma.CategoryFindUniqueArgs): Promise<Category | null> {
		return this.categoryRepository.findUnique(args);
	};

	async create(args: Prisma.CategoryCreateArgs): Promise<Category> {
		const {type} = args.data;
		args.data.slug = slugify(args.data.name, {trim: true, lower: true});
		const isExist = await this.findUnique({
			where: {
				slug: args.data.slug
			},
			select: {
				id: true
			}
		});
		if(isExist) {
			throw new APIError('This name already exists', HttpStatusCode.BadRequest);
		}
		if(!await this.isCorrectParent(type, args.data.parent?.connect?.id)) {
			const errorMessage = this.parentChild[type] ? `The ${type.toLowerCase()} must belong to a ${this.parentChild[type]?.toLowerCase()}` : 'The category has no parent';
			throw new APIError(errorMessage, HttpStatusCode.BadRequest);
		}
		return this.categoryRepository.create(args);
	};

	async update(args: Prisma.CategoryUpdateArgs): Promise<Category> {
		if(args.data.name) {
			args.data.slug = slugify(args.data.name.toString(), {trim: true, lower: true});
			const isExist = await this.findUnique({
				where: {
					slug: args.data.slug
				},
				select: {
					id: true
				}
			});

			if(isExist && isExist.id !== args.where.id) {
				throw new APIError('This name already exists', HttpStatusCode.BadRequest);
			}
		}

		if(args.data.type || args.data.parent?.connect?.id) {
			const category = await this.categoryRepository.findUnique({
				where: args.where,
				select: {
					type: true,
					parentId: true,
				}
			});

			const type = (args.data.type || category?.type) as CategoryType;
			const parentId = (args.data.parent?.connect?.id || category?.parentId) as number;

			if(!await this.isCorrectParent(type, parentId)) {
				const errorMessage = this.parentChild[type] ? `The ${type.toLowerCase()} must belong to a ${this.parentChild[type]?.toLowerCase()}` : 'The category has no parent';
				throw new APIError(errorMessage, HttpStatusCode.BadRequest);
			}
		}

		return this.categoryRepository.update(args);
	}

	delete(id: number): Promise<Category> {
		return this.categoryRepository.delete(id);
	};
}