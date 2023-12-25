type Rating = {
  courseId: number;
  instructorRate?: number;
  courseRate?: number;
  commentForInstructor?: string;
  commentForCourse?: string;
}

export type UpdateStudent = {
  id: number;
  ratings?: Rating;
  enrolledCourses?: number[];
  wishlistCourse?: {
    courseId: number, 
    operation: "connect" | "disconnect"
  };
}