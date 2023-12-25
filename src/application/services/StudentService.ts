import { Prisma, Student } from "@prisma/client"
import {inject, injectable } from "inversify"
import { IStudentRepository } from "../interfaces/IRepositories/IStudentRepository";
import { IStudentService } from "../interfaces/IServices/IStudentService";
import { ExtendedStudent } from "../types/ExtendedStudent";
import { UpdateStudent } from "../inputs/studentInput";
import { CourseService } from "./CourseService";
import APIError from "../../presentation/errorHandlers/APIError";
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode";

@injectable()
export class StudentService implements IStudentService {
	constructor(@inject('IStudentRepository') private studentRepository: IStudentRepository, @inject("ICourseService") private courseService: CourseService) {}

	private async isStudentEnrollInThCourse(userId: number, courseId: number): Promise<Student | null> {
		const student = await this.studentRepository.findFirst({
			where: {
				userId,
				enrolledCourses: {
					some: {
						id: courseId
					}
				}
			},
			select: {
				id: true
			}
		});
		if(student) {
			return student;
		}
		return null;
	};

	count(args: Prisma.StudentCountArgs): Promise<number> {
		return this.studentRepository.count(args);
	};

	findMany(args: Prisma.StudentFindManyArgs): Promise<ExtendedStudent[]> {
		return this.studentRepository.findMany(args);
	};

	findUnique(args: Prisma.StudentFindUniqueArgs): Promise<ExtendedStudent | null> {
		return this.studentRepository.findUnique(args);
	};

	findFirst(args: Prisma.StudentFindFirstArgs): Promise<ExtendedStudent | null> {
		return this.studentRepository.findFirst(args);
	};

	async update(args: {data: UpdateStudent, select?: Prisma.StudentSelect, include?: Prisma.StudentInclude}): Promise<ExtendedStudent> {
		const {id, enrolledCourses, ratings, wishlistCourse} = args.data;
		let instructorId = 0;
		let studentId = 0;
		if(ratings) {
			const isCourseExist = await this.courseService.findUnique({
				where: {
					id: ratings.courseId,
				},
				select: {
					instructorId: true
				}
			});
			if(!isCourseExist) {
				throw new APIError("This course does not exist", HttpStatusCode.BadRequest);
			}
			const student = await this.isStudentEnrollInThCourse(id, ratings.courseId);
			if(!student) {
				throw new APIError('The current student cannot rate the course not enroll in', HttpStatusCode.Forbidden)
			}
			studentId = student.id;
			instructorId = isCourseExist.instructorId;
		}
		return this.studentRepository.update({
			where: {
				userId: id
			},
			data: {
				ratings: ratings ? {
					upsert: {
						where: {
							studentId_courseId_instructorId: {
								studentId,
								instructorId,
								courseId: ratings.courseId,
							},
						},
						update: {
							commentForCourse: ratings.commentForCourse,
							commentForInstructor: ratings.commentForInstructor,
							courseRate: ratings.courseRate,
							instructorRate: ratings.instructorRate
						},
						create: {
							commentForCourse: ratings.commentForCourse,
							commentForInstructor: ratings.commentForInstructor,
							courseRate: ratings.courseRate,
							instructorRate: ratings.instructorRate,
							course: {
								connect: {
									id: ratings.courseId
								},
							},
							instructor: {
								connect: {
									id: instructorId
								}
							}
						}
					}
				} : undefined,
				enrolledCourses: enrolledCourses ? {
					connect: enrolledCourses?.map(id => {
						return {
							id
						}
					})
				} : undefined,
				wishlistCourses: wishlistCourse ? {
					[wishlistCourse.operation]: {
						id: wishlistCourse.courseId
					}
				} : undefined
			},
			select: args.select,
			include: args.include
		});
	};
}