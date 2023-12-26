import { LessonType } from "@prisma/client";

export type CreateLesson = {
  title: string;
  isFree?: boolean;
  attachment?: string; 
  order: number;
  lessonType: LessonType;
  chapterId: number
};

export type UpdateLesson = {
  id: number;
  title?: string;
  isFree?: boolean;
  attachment?: string; 
  lessonType?: LessonType;
};