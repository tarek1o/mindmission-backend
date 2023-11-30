import { Video } from "@prisma/client";
import { IFindBaseRepository } from "./Base/IFindBaseRepository";
import { IUpdateBaseRepository } from "./Base/IUpdateBaseRepository";
import { IDeleteBaseRepository } from "./Base/IDeleteBaseRepository";

export interface IVideoRepository extends IFindBaseRepository<Video>, IUpdateBaseRepository<Video>, IDeleteBaseRepository<Video> {
}