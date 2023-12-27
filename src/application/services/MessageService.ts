import { Prisma, Message } from "@prisma/client"
import {inject, injectable } from "inversify"
import { IMessageService } from "../interfaces/IServices/IMessageService"
import { IMessageRepository } from "../interfaces/IRepositories/IMessageRepository"
import { CreateMessage, UpdateMessage } from "../inputs/messageInput"

@injectable()
export class MessageService implements IMessageService {
	constructor(@inject('IMessageRepository') private messageRepository: IMessageRepository) {}

	count(args: Prisma.MessageCountArgs): Promise<number> {
		return this.messageRepository.count(args);
	};

	findMany(args: Prisma.MessageFindManyArgs): Promise<Message[]> {
		return this.messageRepository.findMany(args);
	};

	findUnique(args: Prisma.MessageFindUniqueArgs): Promise<Message | null> {
		return this.messageRepository.findUnique(args);
	};

  async create(args: {data: CreateMessage, select?: Prisma.MessageSelect, include?: Prisma.MessageInclude}): Promise<Message> {
		const {name, email, message} = args.data;		
		return this.messageRepository.create({
			data: {
        name,
        email,
        message
			},
			select: args.select,
			include: args.include
    });
	};

	async update(args: {data: UpdateMessage, select?: Prisma.MessageSelect, include?: Prisma.MessageInclude}): Promise<Message> {
		const {id, subject, reply, replierId} = args.data;
		return this.messageRepository.update({
			where: {
				id
			},
			data: {
				subject,
				reply: reply,
				isReplied: true,
        replier: {
          connect: {
            id: replierId
          }
        }
			},
			select: args.select,
			include: args.include
		});
	};

	delete(id: number): Promise<Message> {
		return this.messageRepository.delete(id);
	};
}