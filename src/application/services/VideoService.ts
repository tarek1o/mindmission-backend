import { LessonType, Prisma, Video } from "@prisma/client"
import {inject, injectable } from "inversify"
import { IVideoService } from "../interfaces/IServices/IVideoService"
import { ILessonService } from "../interfaces/IServices/ILessonService"
import { IVideoRepository } from "../interfaces/IRepositories/IVideoRepository"
import { CreateVideo, UpdateVideo } from "../inputs/videoInput"
import APIError from "../../presentation/errorHandlers/APIError"
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode"

@injectable()
export class VideoService implements IVideoService {
	constructor(@inject('IVideoRepository') private videoRepository: IVideoRepository, @inject('ILessonService') private lessonService: ILessonService) {}

	private async isLessonTypeIsVideo(lessonId: number): Promise<boolean> {
		const lesson = await this.lessonService.findUnique({
			where: {
				id: lessonId
			},
			select: {
				lessonType: true
			}
		});
		if(lesson && lesson.lessonType === LessonType.VIDEO) {
			return true;
		}
		return false
	}

	count(args: Prisma.VideoCountArgs): Promise<number> {
		return this.videoRepository.count(args);
	};

	findMany(args: Prisma.VideoFindManyArgs): Promise<Video[]> {
		return this.videoRepository.findMany(args);
	};

	findUnique(args: Prisma.VideoFindUniqueArgs): Promise<Video | null> {
		return this.videoRepository.findUnique(args);
	};

	async create(args: {data: CreateVideo, select?: Prisma.VideoSelect, include?: Prisma.VideoInclude}): Promise<Video> {
		const {title, description, url, lessonId} = args.data;
		if(!await this.isLessonTypeIsVideo(lessonId)) {
			throw new APIError("This lesson may be not exist or may be exist but its type is not a video", HttpStatusCode.BadRequest);
		}
		return this.videoRepository.create({
			data: {
				title,
				description,
				url,
				lesson: {
					connect: {
						id: lessonId
					}
				}
			},
			select: args.select,
			include: args.include
		});
	}

	async update(args: {data: UpdateVideo, select?: Prisma.VideoSelect, include?: Prisma.VideoInclude}): Promise<Video> {
		const {id, title, description, url, lessonId} = args.data;
		if(lessonId && !await this.isLessonTypeIsVideo(lessonId)) {
			throw new APIError("This lesson may be not exist or may be exist but its type is not a video", HttpStatusCode.BadRequest);
		}
		return this.videoRepository.update({
			where: {
				id
			},
			data: {
				title: title || undefined,
				description: description || undefined,
				url: url || undefined,
				lesson: lessonId ? {
					connect: {
						id: lessonId
					}
				} : undefined,
			},
			select: args.select,
			include: args.include
		});
	}

	delete(id: number): Promise<Video> {
		return this.videoRepository.delete(id);
	};
}