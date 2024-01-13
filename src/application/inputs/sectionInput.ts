export type CreateSection = {
  title: string;
  description?: string;
  order: number;
  courseId: number
}

export type UpdateSection = {
  id: number;
  title?: string;
  description?: string;
  lessons?: {id: number, order: number}[];
}