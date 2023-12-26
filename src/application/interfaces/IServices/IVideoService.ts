import { Prisma, Video } from "@prisma/client";
import { CreateVideo, UpdateVideo } from "../../inputs/videoInput";

export interface IVideoService {
  count(args: Prisma.VideoCountArgs): Promise<number>;
  findMany(args: Prisma.VideoFindManyArgs): Promise<Video[]>;
  findUnique(args: Prisma.VideoFindUniqueArgs): Promise<Video | null>
  create(args: {data: CreateVideo, select?: Prisma.VideoSelect, include?: Prisma.VideoInclude}): Promise<Video>;
  update(args: {data: UpdateVideo, select?: Prisma.VideoSelect, include?: Prisma.VideoInclude}): Promise<Video>;
  delete(id: number): Promise<Video>;
}