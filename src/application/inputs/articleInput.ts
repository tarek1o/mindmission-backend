export type CreateArticle = {
  title: string;
  content: string;
  readingTime: number;
  lessonId: number;
}

export type UpdateArticle = {
  id: number;
  title?: string;
  content?: string;
  readingTime?: number;
  lessonId?: number;
}