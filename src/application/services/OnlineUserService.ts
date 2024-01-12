import { Prisma, OnlineUser } from "@prisma/client"
import {inject, injectable } from "inversify"
import { IOnlineUserService } from "../interfaces/IServices/IOnlineUserService"
import { IOnlineUserRepository } from "../interfaces/IRepositories/IOnlineUserRepository"
import { IUserService } from "../interfaces/IServices/IUserService"
import { CreateOnlineUser } from "../inputs/onlineUserInput"
import { Transaction } from "../../infrastructure/services/Transaction"

@injectable()
export class OnlineUserService implements IOnlineUserService {
	constructor(@inject('IOnlineUserRepository') private onlineUserRepository: IOnlineUserRepository, @inject('IUserService') private userService: IUserService) {}

	aggregate(args: Prisma.OnlineUserAggregateArgs): Prisma.PrismaPromise<Prisma.GetOnlineUserAggregateType<Prisma.OnlineUserAggregateArgs>> {
    return this.onlineUserRepository.aggregate(args);
  }

	count(args: Prisma.OnlineUserCountArgs): Promise<number> {
		return this.onlineUserRepository.count(args);
	};

	findMany(args: Prisma.OnlineUserFindManyArgs): Promise<OnlineUser[]> {
		return this.onlineUserRepository.findMany(args);
	};

	findUnique(args: Prisma.OnlineUserFindUniqueArgs): Promise<OnlineUser | null> {
		return this.onlineUserRepository.findUnique(args);
	};

	async create(args: {data: CreateOnlineUser, select?: Prisma.OnlineUserSelect, include?: Prisma.OnlineUserInclude}): Promise<OnlineUser> {
		const {socketId, userId} = args.data;
		return Transaction.transact<OnlineUser>(async() => {
			const createdOnlineUser = await this.onlineUserRepository.upsert({
				where: {
					socketId,
					userId
				},
				create: {
					socketId,
					user: {
						connect: {
							id: userId
						}
					}
				},
				update: {},
				select: args.select,
				include: args.include
			});
			const onlineUserDevices = await this.onlineUserRepository.count({
				where: {
					userId
				}
			});
			if(onlineUserDevices === 1) {
				await this.userService.update({
					data: {
						id: userId,
						isOnline: true
					},
					select: {
						id: true
					}
				})
			}
			return createdOnlineUser;
		})
	};

	async delete(socketId: string): Promise<OnlineUser> {
		return Transaction.transact<OnlineUser>(async () => {
			const deletedOnlineUser = await this.onlineUserRepository.delete({
				where: {
					socketId,
				},
				select: {
					id: true,
					userId: true,
				}
			});
			const onlineUserDevices = await this.onlineUserRepository.count({
				where: {
					userId: deletedOnlineUser.userId
				}
			});
			if(onlineUserDevices === 0) {
				this.userService.update({
					data: {
						id: deletedOnlineUser.userId,
						isOnline: false
					},
					select: {
						id: true
					}
				});
			}
			return deletedOnlineUser;
		})
	};
}