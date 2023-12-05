import { Application } from 'express';
import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import authenticationRoutes from "./routes/authenticationRoutes";
import modelPermissionRoutes from "./routes/modelPermissionRoutes";
import logRoutes from "./routes/logRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import instructorRoutes from "./routes/instructorRoutes";
import courseRoutes from "./routes/courseRoutes";
import chapterRoutes from "./routes/chapterRoutes";
import lessonRoutes from "./routes/lessonRoutes";
import articleRoutes from "./routes/articleRoutes";
import videoRoutes from "./routes/videoRoutes";
import quizRoutes from "./routes/quizRoutes";
import whatsAppRoute from "./routes/whatsAppRoutes"

export const routeMounting = (app: Application) => {
  app.use(`${process.env.apiVersion}/auth`, authenticationRoutes);
  app.use(`${process.env.apiVersion}/users`, userRoutes);
  app.use(`${process.env.apiVersion}/roles`, roleRoutes);
  app.use(`${process.env.apiVersion}/logs`, logRoutes);
  app.use(`${process.env.apiVersion}/permissions`, modelPermissionRoutes);
  app.use(`${process.env.apiVersion}/categories`, categoryRoutes);
  app.use(`${process.env.apiVersion}/instructors`, instructorRoutes);
  app.use(`${process.env.apiVersion}/courses`, courseRoutes);
  app.use(`${process.env.apiVersion}/chapters`, chapterRoutes);
  app.use(`${process.env.apiVersion}/lessons`, lessonRoutes);
  app.use(`${process.env.apiVersion}/articles`, articleRoutes);
  app.use(`${process.env.apiVersion}/videos`, videoRoutes);
  app.use(`${process.env.apiVersion}/quizzes`, quizRoutes);
  // app.use(`${process.env.apiVersion}/whatsApp`, whatsAppRoute);
}