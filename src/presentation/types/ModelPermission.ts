export type AllowedModel = "User" | "Role" | "Instructor" | "Student" | "Log" | "Category" | "Course" | "Rating" | "Chapter" | "Lesson" | "Video" | "Article" | "Quiz" | "Comment";
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
  Videos: 'video',
  Articles: 'article',
  Quizzes: 'quiz',
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