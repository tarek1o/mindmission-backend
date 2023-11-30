import { Prisma, Video } from "@prisma/client"
import {inject, injectable } from "inversify"
import slugify from "slugify"
import { IVideoService } from "../interfaces/IServices/IVideoService"
import { IVideoRepository } from "../interfaces/IRepositories/IVideoRepository"

@injectable()
export class VideoService implements IVideoService {
	constructor(@inject('IVideoRepository') private videoRepository: IVideoRepository) {}

	count(args: Prisma.VideoCountArgs): Promise<number> {
		return this.videoRepository.count(args);
	};

	findMany(args: Prisma.VideoFindManyArgs): Promise<Video[]> {
		return this.videoRepository.findMany(args);
	};

	findUnique(args: Prisma.VideoFindUniqueArgs): Promise<Video | null> {
		return this.videoRepository.findUnique(args);
	};

	async update(args: Prisma.VideoUpdateArgs): Promise<Video> {
    if(args.data.title) {
      args.data.slug = slugify(args.data.title.toString(), {lower: true, trim: true});
    }
		return this.videoRepository.update(args);
	}

	delete(id: number): Promise<Video> {
		return this.videoRepository.delete(id);
	};
}