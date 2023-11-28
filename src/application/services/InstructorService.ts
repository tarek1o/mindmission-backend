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
		const {skills, ratings} = args.data;
		// if( avgOfRatings) {
		// 	const instructor = await this.findUnique({
		// 		where: args.where,
		// 		select: {
		// 			noOfRatings: true,
		// 			avgOfRatings: true
		// 		}
		// 	});
		// 	if(instructor) {
		// 		const newAvg = (instructor.avgOfRatings + (avgOfRatings as number)) / (instructor.noOfRatings + 1);
		// 		args.data.noOfRatings = avgOfRatings ? instructor.noOfRatings + 1 : undefined;
		// 		args.data.avgOfRatings = avgOfRatings ? newAvg : undefined;
		// 	}
		// }
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