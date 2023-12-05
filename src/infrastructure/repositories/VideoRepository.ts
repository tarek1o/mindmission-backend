import { Prisma, Video } from "@prisma/client";
import { injectable } from "inversify";
import { IVideoRepository } from "../../application/interfaces/IRepositories/IVideoRepository";
import prisma from "../../domain/db";

@injectable()
export class VideoRepository implements IVideoRepository {
  constructor() {}

  count(args: Prisma.VideoCountArgs): Promise<number> {
    return prisma.video.count(args)
  }

  findMany(args: Prisma.VideoFindManyArgs): Promise<Video[]> {
    return prisma.video.findMany(args);
  }

  findUnique(args: Prisma.VideoFindUniqueArgs): Promise<Video | null> {
    return prisma.video.findUnique(args);
  }

  create(args: Prisma.VideoCreateArgs): Promise<Video> {
    return prisma.video.create(args);
  }

  update(args: Prisma.VideoUpdateArgs): Promise<Video> {
    return prisma.video.update(args);
  }

  delete(id: number): Promise<Video> {
    return prisma.video.delete({
      where: {
        id,
      }
    });
  }
}