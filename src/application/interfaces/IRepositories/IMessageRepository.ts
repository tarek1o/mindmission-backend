import { Message } from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface IMessageRepository extends IRepository<Message> {
}