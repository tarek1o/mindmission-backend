import { Student, Course } from "@prisma/client";

export interface ExtendedStudent extends Student {
  enrolledCourses?: Course[]
  wishlistCourses?: Course[]
}