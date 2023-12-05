import { Video } from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface IVideoRepository extends IRepository<Video> {
}