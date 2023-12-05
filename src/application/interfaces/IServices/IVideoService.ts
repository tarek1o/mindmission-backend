import { Prisma, Video } from "@prisma/client";

export interface IVideoService {
  count(args: Prisma.VideoCountArgs): Promise<number>;
  findMany(args: Prisma.VideoFindManyArgs): Promise<Video[]>;
  create(args: Prisma.VideoCreateArgs): Promise<Video>;
  findUnique(args: Prisma.VideoFindUniqueArgs): Promise<Video | null>
  update(args: Prisma.VideoUpdateArgs): Promise<Video>;
  delete(id: number): Promise<Video>;
}