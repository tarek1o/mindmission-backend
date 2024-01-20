export type CreateEnrollment = {
  userId: number;
  courseIds: number[];
}

export type UpdateEnrollment = {
  userId: number;
  courseId: number;
  lessonId?: number;
}