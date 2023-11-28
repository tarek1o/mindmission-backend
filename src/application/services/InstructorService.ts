import { Prisma } from "@prisma/client"
import {inject, injectable } from "inversify"
import { IInstructorRepository } from "../interfaces/IRepositories/IInstructorRepository";
import { IInstructorService } from "../interfaces/IServices/IInstructorService";
import { ExtendedInstructor } from "../types/ExtendedInstructor";
import slugify from "slugify";

@injectable()
export class InstructorService implements IInstructorService {
	constructor(@inject('IInstructorRepository') private instructorRepository: IInstructorRepository) {}

	count(args: Prisma.InstructorCountArgs): Promise<number> {
		return this.instructorRepository.count(args);
	};

	findMany(args: Prisma.InstructorFindManyArgs): Promise<ExtendedInstructor[]> {
		return this.instructorRepository.findMany(args);
	};

	findUnique(args: Prisma.InstructorFindUniqueArgs): Promise<ExtendedInstructor | null> {
		return this.instructorRepository.findUnique(args);
	};

	async update(args: Prisma.InstructorUpdateArgs): Promise<ExtendedInstructor> {
		const {skills} = args.data;
		if(skills) {
			args.data.skills = {
				upsert: (skills as any).map((skill: {name: string}) => {
					const slug = slugify(skill.name, {lower: true, trim: true});
					return {
						where: {
							slug_instructorId: {
								instructorId: args.where.id,
								slug,
							},
						},
						update: {
							name: skill.name,
							slug
						},
						create: {
							name: skill.name,
							slug
						}
					}
				})
			}
		}
		return this.instructorRepository.update(args);
	};
}