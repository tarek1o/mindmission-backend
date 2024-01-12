import { LessonType, Prisma, Video } from "@prisma/client";
import {inject, injectable } from "inversify";
import { IVideoService } from "../interfaces/IServices/IVideoService";
import { ILessonService } from "../interfaces/IServices/ILessonService";
import { ICourseService } from "../interfaces/IServices/ICourseService";
import { IVideoRepository } from "../interfaces/IRepositories/IVideoRepository";
import { Transaction } from "../../infrastructure/services/Transaction";
import { CreateVideo, UpdateVideo } from "../inputs/videoInput";
import APIError from "../../presentation/errorHandlers/APIError";
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode";

@injectable()
export class VideoService implements IVideoService {
	constructor(@inject('IVideoRepository') private videoRepository: IVideoRepository, @inject('ILessonService') private lessonService: ILessonService, @inject("ICourseService") private courseService: ICourseService) {}

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

	private async updateCourseInfo(videoId: number, operationType: "create" | "update" | "delete", time?: number) {
		const video = await this.findUnique({
			where: {
				id: videoId
			},
			select: {
				time: true,
				lesson: {
					select: {
						chapter: {
							select: {
								course: {
									select: {
										id: true,
										hours: true,
										lectures: true,
									}
								}
							}
						}
					}
				}
			}
		}) as any;
		if(!video) {
			throw new APIError("This video is not exist", HttpStatusCode.BadRequest);
		}
		let {id, hours, lectures} = video.lesson.chapter.course;
		if(time && operationType === 'update') {
			time -= video.time;			
		}
		if(operationType === 'delete') {
			time = -video.time;
		}
		await this.courseService.update({
			data: {
				id,
				hours: hours + time,
				lectures: operationType === "create" ? lectures + 1 : (operationType === "delete" ? lectures - 1 : undefined)
			}
		})
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
		const {title, description, url, time, lessonId} = args.data;
		if(!await this.isLessonTypeIsVideo(lessonId)) {
			throw new APIError("This lesson may be not exist or may be exist but its type is not a video", HttpStatusCode.BadRequest);
		}
		return Transaction.transact<Video>(async () => {
			const createdVideo = await this.videoRepository.create({
				data: {
					title,
					description,
					url,
					time,
					lesson: {
						connect: {
							id: lessonId
						}
					}
				},
				select: args.select,
				include: args.include
			});
			await this.updateCourseInfo(createdVideo.id, 'create', time);
			return createdVideo;
		});
	}

	async update(args: {data: UpdateVideo, select?: Prisma.VideoSelect, include?: Prisma.VideoInclude}): Promise<Video> {
		const {id, title, description, url, time, lessonId} = args.data;
		if(lessonId && !await this.isLessonTypeIsVideo(lessonId)) {
			throw new APIError("This lesson may be not exist or may be exist but its type is not a video", HttpStatusCode.BadRequest);
		}
		return Transaction.transact<Video>(async () => {
			if(time) {
				await this.updateCourseInfo(id, 'update', time);
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
		});
	}

	async delete(id: number): Promise<Video> {
		return Transaction.transact<Video>(async () => {
			await this.updateCourseInfo(id, 'delete');
			return this.videoRepository.delete(id);
		});
	};
}