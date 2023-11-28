import { Instructor, Skill, Course } from "@prisma/client";
import { ExtendedUser } from "./ExtendedUser";

export interface ExtendedInstructor extends Instructor {
  skills?: Skill[]
  courses?: Course[]
}