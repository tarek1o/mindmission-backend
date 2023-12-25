import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import asyncHandler from'express-async-handler';
import bcrypt from 'bcrypt';
import { IUserService } from "../../application/interfaces/IServices/IUserService";
import { ILogService } from "../../application/interfaces/IServices/ILogService";
import { JWTGenerator } from "../services/JWTGenerator";
import { RequestManager } from "../services/RequestManager";
import { UserMapper } from "../mapping/UserMapper";
import { ExtendedRequest } from "../types/ExtendedRequest";
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";
import APIError from "../errorHandlers/APIError";
import HttpStatusCode from '../enums/HTTPStatusCode';

@injectable()
export class UserController {
	restrictedPropertiesForAdminOnly: string[] = ['isBlocked', 'isDeleted', 'role'];

	constructor(@inject('IUserService') private userService: IUserService, @inject('ILogService') private logService: ILogService) {}

	private isUserCredentialsRight = async (email: string, password: string) => {
		const user = await this.userService.findFirst({
			where: {
				email: {equals: email, mode: 'insensitive'}
			},
			select: {
				id: true,
				email: true, 
				password: true
			}
		});

		if(user && bcrypt.compareSync(password, user.password)) {
			return user;
		}
		return null;
	};

	getAllUsers = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const findOptions = RequestManager.findOptionsWrapper(request);
		const promiseResult = await Promise.all([
			this.userService.findMany(findOptions),
			this.userService.count({where: findOptions.where})
		]);

		const mappedUserResults = UserMapper.map(promiseResult[0]);
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'All users are retrieved successfully', mappedUserResults, promiseResult[1], findOptions.skip, findOptions.take));
	});

	getUserById = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const user = await this.userService.findUnique({
			where: {
				id: +request.params.id,
			},
			select,
			include,
		});
		if(!user) {
			throw new APIError('This user does not exist', HttpStatusCode.BadRequest);
		}

		const mappedUserResults = UserMapper.map([user]);

		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The user is retrieved successfully', mappedUserResults));
	});

	createUser = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {firstName, lastName, email, password, mobilePhone, whatsAppNumber, bio, picture, roleId} = request.body.input;
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const createdUser = await this.userService.create({
			data: {
				firstName,
				lastName,
				email,
				password,
				bio,
				picture,
				mobilePhone,
				whatsAppNumber,
				role: {
					connect: {
						id: roleId,
					}
				},
			},
			select,
			include,
		});
		this.logService.log('ADD', 'USER', createdUser, request.user);
		const mappedUserResults = UserMapper.map([createdUser]);
		response.status(HttpStatusCode.Created).json(ResponseFormatter.formate(true, 'The user is created successfully', mappedUserResults));
	});

	updateUser = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {firstName, lastName, bio, picture, mobilePhone, whatsAppNumber, isActive, isBlocked, isDeleted, roleId, personalLinks} = request.body.input;
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const updatedUser = await this.userService.update({
			where: {
				id: +request.params.id
			},
			data: {
				firstName: firstName || undefined,
				lastName: lastName || undefined,
				bio: bio,
				picture: picture || undefined,
				mobilePhone: mobilePhone,
				whatsAppNumber: whatsAppNumber,
				isActive: isActive,
				isBlocked: isBlocked,
				isDeleted: isDeleted,
				role: roleId ? {
					connect: {
						id: roleId
					}
				} : undefined,
				personalLinks: personalLinks ? {
					upsert: personalLinks.map((link: {platform: string, link: string}) => {
						return {
							where : {
								userId_platform: {
									userId: +request.params.id,
									platform: link.platform.toUpperCase(),
								}
							},
							update: {
								link: link.link
							},
							create: {
								platform: link.platform.toUpperCase(),
								link: link.link
							}
						}
					})
				} : undefined
			},
			select,
			include,
		});
		this.logService.log('UPDATE', 'USER', updatedUser, request.user);
		const mappedUserResults = UserMapper.map([updatedUser]);
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The user is updated successfully', mappedUserResults));
	});

	updateUserEmail = asyncHandler(async (request, response, next) => {
		const {email, newEmail, password} = request.body.input;
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const user = await this.isUserCredentialsRight(email, password);
		if(user) {
			const updatedUser = await this.userService.update({
				where: {
					id: user.id,
				},
				data: {
					email: newEmail,
					isEmailVerified: false
				},
				select,
				include,
			});
			const mappedUserResults = UserMapper.map([updatedUser]);
			response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'Your email is updated successfully', [{
				user: mappedUserResults[0],
				token: JWTGenerator.generateAccessToken(updatedUser),
			}]));
			return;
		}
		throw new APIError('Your email or password may be incorrect', HttpStatusCode.BadRequest);
	});

	updateUserPassword = asyncHandler(async (request, response, next) => {
		const {email, newPassword, password} = request.body.input;
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const user = await this.isUserCredentialsRight(email, password);
		if(user) {
			const updatedUser = await this.userService.update({
				where: {
					id: user.id
				},
				data: {
					password: newPassword
				},
				select,
				include,
			});
			const mappedUserResults = UserMapper.map([updatedUser]);
			response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'Your password is updated successfully', [{
				user: mappedUserResults[0],
				token: JWTGenerator.generateAccessToken(updatedUser),
			}]));			
			return;
		}
		throw new APIError('Your email or password may be incorrect', HttpStatusCode.BadRequest);
	});

	deleteUser = asyncHandler(async (request: ExtendedRequest, response: Response, next: NextFunction) => {
		const deletedUser = await this.userService.delete(+request.params.id);
		this.logService.log('DELETE', 'USER', deletedUser, request.user);
		response.status(HttpStatusCode.NoContent).json();
	});
}