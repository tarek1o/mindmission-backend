export type CreateVideo = {
  title: string, 
  description?: string; 
  url: string;
  lessonId: number;
};

export type UpdateVideo = {
  id: number;
  title?: string, 
  description?: string; 
  url?: string;
  lessonId?: number;
};