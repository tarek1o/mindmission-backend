import { Prisma } from "@prisma/client"
import {inject, injectable } from "inversify"
import { IStudentRepository } from "../interfaces/IRepositories/IStudentRepository";
import { IStudentService } from "../interfaces/IServices/IStudentService";
import { ExtendedStudent } from "../types/ExtendedStudent";
import slugify from "slugify";

@injectable()
export class StudentService implements IStudentService {
	constructor(@inject('IStudentRepository') private studentRepository: IStudentRepository) {}

	count(args: Prisma.StudentCountArgs): Promise<number> {
		return this.studentRepository.count(args);
	};

	findMany(args: Prisma.StudentFindManyArgs): Promise<ExtendedStudent[]> {
		return this.studentRepository.findMany(args);
	};

	findUnique(args: Prisma.StudentFindUniqueArgs): Promise<ExtendedStudent | null> {
		return this.studentRepository.findUnique(args);
	};

	async update(args: Prisma.StudentUpdateArgs): Promise<ExtendedStudent> {
		return this.studentRepository.update(args);
	};
}