export type CreateArticle = {
  title: string;
  content: string;
  lessonId: number;
}

export type UpdateArticle = {
  id: number;
  title?: string;
  content?: string;
  lessonId?: number;
}