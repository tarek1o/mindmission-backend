export type AllowedModel = "User" | "Role" | "Instructor" | "Student" | "Log" | "Category" | "Course" | "Rating" | "Chapter" | "Lesson" | "Assignment" | "Comment";
export type AllowedMethod = "GET" | "POST" | "PATCH" | "DELETE";

export const AllowedModels = {
  Users: 'user',
  Roles: 'role',
  Instructors: 'instructor',
  Students: 'student',
  Logs: "log",
  Categories: 'category',
  Courses: 'course',
  Ratings: 'rating',
  Chapters: 'chapter',
  Lessons: 'lesson',
  Assignments: 'Assignment',
  Comments: 'comment',
}

export const Permissions = {
  Read: 'get',
  Create: 'post',
  Update: 'patch',
  Delete: 'delete'
}

Object.freeze(AllowedModels);
Object.freeze(Permissions);