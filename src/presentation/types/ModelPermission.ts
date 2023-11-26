export type AllowedModel = "User" | "Role" | "Instructor" | "Student" | "Log" | "Category" | "Course" | "Review" | "Chapter" | "Lesson" | "Assignment" | "Comment";

export const AllowedModels = {
  Users: 'user',
  Roles: 'role',
  Instructors: 'instructor',
  Students: 'student',
  Logs: "log",
  Categories: 'category',
  Courses: 'course',
  Reviews: 'review',
  Chapters: 'chapter',
  Lessons: 'lesson',
  Assignments: 'Assignment',
  Comments: 'comment',
}

export const Permissions = {
  Read: 'put',
  Create: 'post',
  Update: 'patch',
  Delete: 'delete'
}

Object.freeze(AllowedModels);
Object.freeze(Permissions);