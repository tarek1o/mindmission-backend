import express from 'express';
import container from '../dependencyInjection/DI'
import {idValidation} from "../middlewares/express-validator/idValidation";
import {payValidation} from "../middlewares/express-validator/paymentValidator";
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import { PaymentController } from '../controllers/PaymentController';

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllPayments, getPaymentById, createPayment, payMobPaymentConfirmation, payPalPaymentConfirmation, deletePayment} = container.get<PaymentController>('PaymentController');

const paymentRouter = express.Router();

paymentRouter.route("/get")
	.post(isAuthenticated, isAuthorized('Payment', 'GET'), getAllPayments);

paymentRouter.route("/get/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Payment', 'GET'), getPaymentById);

paymentRouter.route("/pay")
	.post(isAuthenticated, isAuthorized('Payment', 'POST'), payValidation, createPayment);

paymentRouter.route("/paymob/confirm")
	.post(payMobPaymentConfirmation);

paymentRouter.route("/paypal/confirm")
	.post(payPalPaymentConfirmation);

paymentRouter.route("/delete/:id")
	.post(idValidation, isAuthenticated, isAuthorized('Payment', 'DELETE'), deletePayment);

export default paymentRouter;