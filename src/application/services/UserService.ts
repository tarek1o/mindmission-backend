import bcrypt from "bcrypt"
import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import {IUserService} from "../interfaces/IServices/IUserService"
import {IUserRepository} from "../interfaces/IRepositories/IUserRepository"
import { IRoleService } from "../interfaces/IServices/IRoleService";
import { ExtendedUser } from "../types/ExtendedUser";
import APIError from "../../presentation/errorHandlers/APIError";
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode";
import { ExtendedRole } from "../types/ExtendedRole";

@injectable()
export class UserService implements IUserService {
	constructor(@inject('IUserRepository') private userRepository: IUserRepository, @inject('IRoleService') private roleService: IRoleService) {}

	count(args: Prisma.UserCountArgs): Promise<number> {
		return this.userRepository.count(args);
	}

	findMany(args: Prisma.UserFindManyArgs): Promise<ExtendedUser[]> {
		return this.userRepository.findMany(args);
	}

	findUnique(args: Prisma.UserFindUniqueArgs): Promise<ExtendedUser | null> {
    return this.userRepository.findUnique(args);
  }

	findFirst(args: Prisma.UserFindFirstArgs): Promise<ExtendedUser | null> {
		return this.userRepository.findFirst(args);
	}

	async create(args: Prisma.UserCreateArgs): Promise<ExtendedUser> {
		args.data.password = bcrypt.hashSync(args.data.password, 10);
		const isEmailExist = await this.findFirst({
			where: {
				email: {
					equals: args.data.email,
					mode: 'insensitive'
				}
			},
			select: {
				id: true
			}
		});
		if(isEmailExist) {
			throw new APIError('This email already exists', HttpStatusCode.BadRequest);
		};
		if(args.data.role?.connect?.id) {
			const isRoleExist = await this.roleService.findUnique({
				where: {
					id: args.data.role?.connect?.id
				},
				select: {
					id: true,
					slug: true
				}
			});
			if(!isRoleExist) {
				throw new APIError('This role does not exist', HttpStatusCode.BadRequest);
			}
			if(isRoleExist.slug === 'student') {
				args.data.student = {
					create: {}
				}
			}
			else if(isRoleExist.slug === 'instructor') {
				args.data.instructor = {
					create: {}
				}
			}
			else {
				args.data.admin = {
					create: {}
				}
			}
		}
		return this.userRepository.create(args);
	}

	async update(args: Prisma.UserUpdateArgs): Promise<ExtendedUser> {
		if(args.data.password) {
			args.data.password = bcrypt.hashSync(args.data.password.toString(), 10);
		}

		if(args.data.resetPasswordCode && (args.data.resetPasswordCode as any).code && !(args.data.resetPasswordCode as any).isVerified) {
			(args.data.resetPasswordCode as any).code = bcrypt.hashSync((args.data.resetPasswordCode as any).code.toString(), 10);
		}

		if(args.data.email) {
			const isEmailExist = await this.findFirst({
				where: {
					email: {
						equals: args.data.email.toString(),
						mode: 'insensitive'
					}
				},
				select: {
					id: true
				}
			});
			if(isEmailExist && isEmailExist.id !== args.where.id) {
				throw new APIError('This email already exists', HttpStatusCode.BadRequest);
			}
		}

		if(args.data.role?.connect?.id) {
			const isRoleExist = await this.roleService.findUnique({
				where: {
					id: args.data.role?.connect?.id
					
				},
				select: {
					id: true,
					slug: true
				}
			});
			if(!isRoleExist) {
				throw new APIError('This role does not exist', HttpStatusCode.BadRequest);
			}
			const currentUser = await this.findUnique({
				where: args.where,
				select: {
					role: {
						select: {
							id: true,
							slug: true
						}
					},
					admin: {
						select: {
							id: true
						}
					}
				}
			});
			const {id, slug} = currentUser?.role as ExtendedRole;
			if(id !== isRoleExist.id && (slug === 'student' || slug === 'instructor' || (currentUser?.admin && (isRoleExist?.slug === 'student' || isRoleExist?.slug === 'instructor')))) {
				const currentRole = (isRoleExist.slug !== 'instructor' && isRoleExist.slug !== 'student') ? 'admin' : isRoleExist.slug;
				const previousRole = (slug !== 'instructor' && slug !== 'student') ? 'admin' : slug; 
				throw new APIError(`The ${previousRole} role cannot be changed to ${currentRole} role because each one has different profile settings`, HttpStatusCode.BadRequest);
			}
		} 

		return this.userRepository.update(args);
	}

	delete(id: number): Promise<ExtendedUser> {
		return this.userRepository.delete(id);
	}
}