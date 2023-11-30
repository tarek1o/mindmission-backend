import { Prisma, Course, LessonType } from "@prisma/client";
import {inject, injectable } from "inversify";
import slugify from "slugify";
import { ICourseService } from "../interfaces/IServices/ICourseService";
import { ICourseRepository } from "../interfaces/IRepositories/ICourseRepository";
import APIError from "../../presentation/errorHandlers/APIError";
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode";

@injectable()
export class CourseService implements ICourseService {
	constructor(@inject('ICourseRepository') private courseRepository: ICourseRepository) {}

	private createQuestions(questions: any) {
		return questions.map((question: any) => {
			return {
				questionText: question.questionText,
				choiceA: question.choiceA,
				choiceB: question.choiceB,
				choiceC: question.choiceC,
				choiceD: question.choiceD,
				correctAnswer: question.correctAnswer
			}
		})
	};
	
	private createQuiz(quiz: any) {
		return {
			questions: {
				create: this.createQuestions(quiz.questions)
			}
		}
	};

	private createArticle(article: any) {
		return {
			title: article.title,
			slug: slugify(article.title, {lower: true, trim: true}),
			content: article.content,
		}
	};

	private createVideo(video: any) {
		return {
			title: video.title,
			slug: slugify(video.title, {lower: true, trim: true}),
			description: video.description,
			url: video.url,
		}
	};

	private createLessons(lessons: any) {
		return lessons.map((lesson: any) => {
			return {
				title: lesson.title,
				slug: slugify(lesson.title, {lower: true, trim: true}),
				isFree: lesson.isFree,
				lessonType: lesson.lessonType,
				video: lesson.lessonType === LessonType.VIDEO ? {
					create: this.createVideo(lesson.video)
				} : undefined,
				article: lesson.lessonType === LessonType.ARTICLE ? {
					create: this.createArticle(lesson.article)
				} : undefined,
				quiz: lesson.lessonType === LessonType.Quiz ? {
					create: this.createQuiz(lesson.quiz)
				} : undefined
			}
		})
	};

	private createChapters(chapters: any) {
		return chapters.map((chapter: any) => {
			return {
				title: chapter.title,
				slug: slugify(chapter.title, {lower: true, trim: true}),
				lessons: {
					create: this.createLessons(chapter.lessons)
				}
			}
		})
	};

	count(args: Prisma.CourseCountArgs): Promise<number> {
		return this.courseRepository.count(args);
	};

	findMany(args: Prisma.CourseFindManyArgs): Promise<Course[]> {
		return this.courseRepository.findMany(args);
	};

	findUnique(args: Prisma.CourseFindUniqueArgs): Promise<Course | null> {
		return this.courseRepository.findUnique(args);
	};

	async create(args: Prisma.CourseCreateArgs): Promise<Course> {
    args.data.slug = slugify(args.data.title, {lower: true, trim: true});
		args.data.chapters = {
			create: this.createChapters(args.data.chapters)
		}
		return this.courseRepository.create(args);
	};

	async update(args: Prisma.CourseUpdateArgs): Promise<Course> {
    if(args.data.title) {
      args.data.slug = slugify(args.data.title.toString(), {lower: true, trim: true});
    }
		return this.courseRepository.update(args);
	};

	delete(id: number): Promise<Course> {
		return this.courseRepository.delete(id);
	};
}