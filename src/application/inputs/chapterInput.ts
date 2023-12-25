export type CreateChapter = {
  title: string;
  description?: string;
  order: number;
  courseId: number
}

export type UpdateChapter = {
  id: number;
  title?: string;
  description?: string;
  lessons?: {id: number, order: number}[];
}