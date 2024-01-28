import { Application } from 'express';
import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import authenticationRoutes from "./routes/authenticationRoutes";
import ssoGmailRoutes from "./routes/ssoGmailRoutes";
import ssoLinkedinRoutes from "./routes/ssoLinkedinRoutes";
import modelPermissionRoutes from "./routes/modelPermissionRoutes";
import logRoutes from "./routes/logRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import instructorRoutes from "./routes/instructorRoutes";
import studentRoutes from "./routes/studentRoutes";
import courseRoutes from "./routes/courseRoutes";
import sectionRoutes from "./routes/sectionRoutes";
import lessonRoutes from "./routes/lessonRoutes";
import noteRoutes from "./routes/noteRoutes";
import articleRoutes from "./routes/articleRoutes";
import videoRoutes from "./routes/videoRoutes";
import quizRoutes from "./routes/quizRoutes";
import cartRoutes from "./routes/cartRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import enrollmentRoutes from "./routes/enrollmentRoutes";
import ratingRoutes from "./routes/ratingRoutes";
import statisticsRoutes from "./routes/statisticsRoutes";
import couponRoutes from "./routes/couponRoutes";
import commentRoutes from "./routes/commentRoutes";
import messageRoutes from "./routes/messageRoutes";
import certificateRoutes from "./routes/certificateRoutes";
import certificateTemplateRoutes from "./routes/certificateTemplateRoutes";
import enumRoutes from "./routes/enumRoutes";
import whatsAppRoute from "./routes/whatsAppRoutes"

export const routeMounting = (app: Application) => {
  app.use(`${process.env.apiVersion}/auth`, authenticationRoutes);
  app.use(`${process.env.apiVersion}/sso/gmail`, ssoGmailRoutes);
  app.use(`${process.env.apiVersion}/sso/linkedin`, ssoLinkedinRoutes);
  app.use(`${process.env.apiVersion}/users`, userRoutes);
  app.use(`${process.env.apiVersion}/roles`, roleRoutes);
  app.use(`${process.env.apiVersion}/logs`, logRoutes);
  app.use(`${process.env.apiVersion}/permissions`, modelPermissionRoutes);
  app.use(`${process.env.apiVersion}/categories`, categoryRoutes);
  app.use(`${process.env.apiVersion}/instructors`, instructorRoutes);
  app.use(`${process.env.apiVersion}/students`, studentRoutes);
  app.use(`${process.env.apiVersion}/courses`, courseRoutes);
  app.use(`${process.env.apiVersion}/sections`, sectionRoutes);
  app.use(`${process.env.apiVersion}/lessons`, lessonRoutes);
  app.use(`${process.env.apiVersion}/notes`, noteRoutes);
  app.use(`${process.env.apiVersion}/articles`, articleRoutes);
  app.use(`${process.env.apiVersion}/videos`, videoRoutes);
  app.use(`${process.env.apiVersion}/quizzes`, quizRoutes);
  app.use(`${process.env.apiVersion}/carts`, cartRoutes);
  app.use(`${process.env.apiVersion}/payments`, paymentRoutes);
  app.use(`${process.env.apiVersion}/enrollments`, enrollmentRoutes);
  app.use(`${process.env.apiVersion}/ratings`, ratingRoutes);
  app.use(`${process.env.apiVersion}/statistics`, statisticsRoutes);
  app.use(`${process.env.apiVersion}/coupons`, couponRoutes);
  app.use(`${process.env.apiVersion}/comments`, commentRoutes);
  app.use(`${process.env.apiVersion}/messages`, messageRoutes);
  app.use(`${process.env.apiVersion}/certificates`, certificateRoutes);
  app.use(`${process.env.apiVersion}/templates/certificates`, certificateTemplateRoutes);
  app.use(`${process.env.apiVersion}/enums`, enumRoutes);
  // app.use(`${process.env.apiVersion}/whatsApp`, whatsAppRoute);
}