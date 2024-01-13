export type AllowedModel = "User" | "Role" | "Instructor" | "Student" | "Log" | "Category" | "Course" | "Payment" | "Wishlist" | "Rating" | "Section" | "Lesson" | "Video" | "Article" | "Quiz" | "Comment" | "Coupon" | "Message";
export type AllowedMethod = "GET" | "POST" | "PATCH" | "DELETE";

export const AllowedModels = {
  Users: 'user',
  Roles: 'role',
  Instructors: 'instructor',
  Students: 'student',
  Logs: "log",
  Categories: 'category',
  Courses: 'course',
  Wishlists: 'wishlist',
  Payments: 'payment',
  Ratings: 'rating',
  Sections: 'section',
  Lessons: 'lesson',
  Videos: 'video',
  Articles: 'article',
  Quizzes: 'quiz',
  Comments: 'comment',
  Coupons: 'coupon',
  Messages: 'message'
}

export const Permissions = {
  Read: 'get',
  Create: 'post',
  Update: 'patch',
  Delete: 'delete'
}

Object.freeze(AllowedModels);
Object.freeze(Permissions);