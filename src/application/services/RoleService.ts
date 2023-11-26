import { Prisma, Role } from "@prisma/client"
import {inject, injectable } from "inversify"
import slugify from "slugify"
import {IRoleService} from "../interfaces/IServices/IRoleService"
import {IRoleRepository} from "../interfaces/IRepositories/IRoleRepository"
import APIError from "../../presentation/errorHandlers/APIError"
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode"

@injectable()
export class RoleService implements IRoleService {
	constructor(@inject('IRoleRepository') private roleRepository: IRoleRepository) {}
	
	count(args: Prisma.RoleCountArgs): Promise<number> {
		return this.roleRepository.count(args);
	}

	findMany(args: Prisma.RoleFindManyArgs): Promise<Role[]> {
		return this.roleRepository.findMany(args);
	}

	findUnique(args: Prisma.RoleFindUniqueArgs): Promise<Role | null> {
		return this.roleRepository.findUnique(args);
	}

	async create(args: Prisma.RoleCreateArgs): Promise<Role> {
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
		return this.roleRepository.create(args);
	}

	async update(args: Prisma.RoleUpdateArgs): Promise<Role> {
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
		return this.roleRepository.update(args);
	}

	async delete(id: number): Promise<Role> {
		const role = await this.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				slug: true
			}
		})

		if(!role) {
			throw new Error('This role is not exist');
		}

		if(role.slug === "student" || role.slug === "instructor" || role.slug === "super-admin") {
			throw new Error('This role is not deletable');
		}
		return this.roleRepository.delete(id);
	}
}