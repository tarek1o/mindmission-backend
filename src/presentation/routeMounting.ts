import { Application } from 'express';
import userRoutes from "./routes/userRoute";
import roleRoutes from "./routes/roleRoute";
import authenticationRoutes from "./routes/authenticationRoute";
import modelPermissionRoutes from "./routes/modelPermissionRoute";
import logRoutes from "./routes/logRoute";
import categoryRoutes from "./routes/categoryRoute";
import instructorRoutes from "./routes/instructorRoute";
import whatsAppRoute from "./routes/whatsAppRoute"

export const routeMounting = (app: Application) => {
  app.use(`${process.env.apiVersion}/auth`, authenticationRoutes);
  app.use(`${process.env.apiVersion}/users`, userRoutes);
  app.use(`${process.env.apiVersion}/roles`, roleRoutes);
  app.use(`${process.env.apiVersion}/logs`, logRoutes);
  app.use(`${process.env.apiVersion}/permissions`, modelPermissionRoutes);
  app.use(`${process.env.apiVersion}/categories`, categoryRoutes);
  app.use(`${process.env.apiVersion}/instructors`, instructorRoutes);
  // app.use(`${process.env.apiVersion}/whatsApp`, whatsAppRoute);
}