import { Prisma, Message } from "@prisma/client";
import { injectable } from "inversify";
import { IMessageRepository } from "../../application/interfaces/IRepositories/IMessageRepository";
import prisma from "../../domain/db";

@injectable()
export class MessageRepository implements IMessageRepository {
  constructor() {}

  count(args: Prisma.MessageCountArgs): Promise<number> {
    return prisma.message.count(args)
  }

  findMany(args: Prisma.MessageFindManyArgs): Promise<Message[]> {
    return prisma.message.findMany(args);
  }

  findUnique(args: Prisma.MessageFindUniqueArgs): Promise<Message | null> {
    return prisma.message.findUnique(args);
  }

  create(args: Prisma.MessageCreateArgs): Promise<Message> {
    return prisma.message.create(args);
  }

  update(args: Prisma.MessageUpdateArgs): Promise<Message> {
    return prisma.message.update(args);
  }

  delete(id: number): Promise<Message> {
    return prisma.message.delete({
      where: {
        id,
      }
    });
  }
}