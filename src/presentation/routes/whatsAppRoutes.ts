import express from 'express';
import {sendMessageByWhatsApp, connect} from '../controllers/whatsAppController';

const userRouter = express.Router();

userRouter.route("/scan")
  .post(connect);
  
userRouter.route("/scan")
  .post(sendMessageByWhatsApp);

export default userRouter;