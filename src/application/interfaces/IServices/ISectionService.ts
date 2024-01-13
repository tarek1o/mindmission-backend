import { Prisma, Section } from "@prisma/client";
import { CreateSection, UpdateSection } from "../../inputs/sectionInput";

export interface ISectionService {
  count(args: Prisma.SectionCountArgs): Promise<number>;
  findMany(args: Prisma.SectionFindManyArgs): Promise<Section[]>;
  findUnique(args: Prisma.SectionFindUniqueArgs): Promise<Section | null>
  findFirst(args: Prisma.SectionFindFirstArgs): Promise<Section | null>
  create(args: {data: CreateSection, select?: Prisma.SectionSelect, include?: Prisma.SectionInclude}): Promise<Section>;
  update(args: {data: UpdateSection, select?: Prisma.SectionSelect, include?: Prisma.SectionInclude}): Promise<Section>;
  delete(id: number): Promise<Section>;
}