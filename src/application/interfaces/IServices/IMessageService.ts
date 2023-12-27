import { Prisma, Message } from "@prisma/client";
import { CreateMessage, UpdateMessage } from "../../inputs/messageInput";

export interface IMessageService {
  count(args: Prisma.MessageCountArgs): Promise<number>;
  findMany(args: Prisma.MessageFindManyArgs): Promise<Message[]>;
  findUnique(args: Prisma.MessageFindUniqueArgs): Promise<Message | null>
  create(args: {data: CreateMessage, select?: Prisma.MessageSelect, include?: Prisma.MessageInclude}): Promise<Message>;
  update(args: {data: UpdateMessage, select?: Prisma.MessageSelect, include?: Prisma.MessageInclude}): Promise<Message>;
  delete(id: number): Promise<Message>;
}