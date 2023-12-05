import { LessonType, Prisma, Video } from "@prisma/client"
import {inject, injectable } from "inversify"
import slugify from "slugify"
import { IVideoService } from "../interfaces/IServices/IVideoService"
import { ILessonService } from "../interfaces/IServices/ILessonService"
import { IVideoRepository } from "../interfaces/IRepositories/IVideoRepository"
import APIError from "../../presentation/errorHandlers/APIError"
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode"

@injectable()
export class VideoService implements IVideoService {
	constructor(@inject('IVideoRepository') private videoRepository: IVideoRepository, @inject('ILessonService') private lessonService: ILessonService) {}

	private async isLessonTypeIsVideo(lessonId: number) {
		const lesson = await this.lessonService.findUnique({
			where: {
				id: lessonId
			},
			select: {
				lessonType: true
			}
		});

		if(!lesson) {
			throw new APIError('This lesson is not exist', HttpStatusCode.BadRequest);
		}

		if(lesson.lessonType !== LessonType.VIDEO) {
			throw new APIError('The type of this lesson is not video', HttpStatusCode.BadRequest);
		}
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

	async create(args: Prisma.VideoCreateArgs): Promise<Video> {
		await this.isLessonTypeIsVideo(args.data.lesson?.connect?.id as number);
		return this.videoRepository.create(args);
	}

	async update(args: Prisma.VideoUpdateArgs): Promise<Video> {
		if(args.data.lesson?.connect?.id) {
			await this.isLessonTypeIsVideo(args.data.lesson.connect.id);
		}
		return this.videoRepository.update(args);
	}

	delete(id: number): Promise<Video> {
		return this.videoRepository.delete(id);
	};
}