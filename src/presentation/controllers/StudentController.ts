import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import asyncHandler from'express-async-handler';
import { PaymentMethod } from "@prisma/client";
import { ExtendedPaymentUnit } from "../../application/types/ExtendedPaymentUnit";
import {IStudentService} from "../../application/interfaces/IServices/IStudentService"
import { IPaymentService } from "../../application/interfaces/IServices/IPaymentService";
import PayMob from "../services/PayMob";
import PayPal from "../services/PayPal";
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";
import { RequestManager } from "../services/RequestManager";
import { ExtendedRequest } from "../types/ExtendedRequest";
import HttpStatusCode from '../enums/HTTPStatusCode';
import APIError from "../errorHandlers/APIError";

@injectable()
export class StudentController {

	constructor(@inject('IStudentService') private studentService: IStudentService, @inject("IPaymentService") private paymentService: IPaymentService) {}

	private async enrollmentConfirmation(paymentId: number) {
		const updatedPayment = await this.paymentService.update({
			data: {
				id: paymentId,
				status: 'COMPLETE'
			},
			select: {
				id: true,
				status: true,
				studentId: true,
				paymentUnits: {
					select: {
						courseId: true
					}
				}
			}
		});
		const enrolledCourses = updatedPayment?.paymentUnits?.map(unit => unit.courseId);
		await this.studentService.update({data: {id: updatedPayment.studentId, enrolledCourses}});
	};

	getAllStudents = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const findOptions = RequestManager.findOptionsWrapper(request);
		const promiseResult = await Promise.all([
			this.studentService.findMany(findOptions),
			this.studentService.count({where: findOptions.where})
		]);
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'All students are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
	});

	getStudentById = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const student = await this.studentService.findUnique({
			where: {
				id: +request.params.id,
			},
			select,
			include
		});
		if(!student) {
			throw new APIError('This Student does not exist', HttpStatusCode.BadRequest);
		}
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The student is retrieved successfully', [student]));
	});

	addToWishlist = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {courseId} = request.body.input;
		const updatedStudent = await this.studentService.update({
			data: {
				id: request.user?.id as number, 
				wishlistCourse: {
					operation: "connect",
					courseId
				}
			}, 
			select, 
			include
		});
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The course is added to student wishlist successfully', [updatedStudent]));
	});

	removeFromWishlist = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const {courseId} = request.body.input;
		const updatedStudent = await this.studentService.update({
			data: {
				id: request.user?.id as number, 
				wishlistCourse: {
					operation: "disconnect",
					courseId
				}
			}, 
			select, 
			include
		});
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The course is removed from student wishlist successfully', [updatedStudent]));
	});

	enroll = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const payment = await this.paymentService.create({
			data: {
				...request.body.input,
				userId: request.user?.id, 
			}, 
			select, 
			include: {
			...include,
			paymentUnits: {
				include: {
					course: true
				}
			}
		}});
		const orderItems = payment.paymentUnits as ExtendedPaymentUnit[];
		let res;
		if(request.body.input.paymentMethod === PaymentMethod.CARD) {
			const paymentToken = await PayMob.createPaymentOrder(payment.id, payment.totalPrice, payment.currency, payment.discount, orderItems);
			res = ResponseFormatter.formate(true, 'The payment token is created successfully', [{payment, paymentToken}]);
		}
		else {
			const paymentSessionId = await PayPal.createPaymentOrder(payment.id, payment.totalPrice, "USD", payment.discount, orderItems);
			res = ResponseFormatter.formate(true, 'The payment session is created successfully', [{payment, paymentSessionId}]);
		}
		this.paymentService.deleteNotCompletedPayment(payment.id);
		response.status(HttpStatusCode.Created).json(res);
	});

	enrollmentPayMobConfirmation = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		if(PayMob.isValidRequest(request)) {
			const paymentId = PayMob.getPaymentId(request);
			await this.enrollmentConfirmation(paymentId);
			response.status(HttpStatusCode.OK).send(ResponseFormatter.formate(true, "The payment is confirmed successfully"));
			return;
		}
		response.status(HttpStatusCode.BadRequest).send(ResponseFormatter.formate(false, "Invalid PayMob Request"));
	});

	enrollmentPayPalConfirmation = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		if(await PayPal.isValidRequest(request)) {
			const paymentId = PayPal.getPaymentId(request);
			await this.enrollmentConfirmation(paymentId);
			response.status(HttpStatusCode.OK).send(ResponseFormatter.formate(true, "The payment is confirmed successfully"));
			return;
		}
		response.status(HttpStatusCode.BadRequest).send(ResponseFormatter.formate(false, "Invalid PayPal Request"));
	});

	rate = asyncHandler(async(request: ExtendedRequest, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const updatedStudent = await this.studentService.update({data: {id: request.user?.id as number, ratings: {...request.body.input}}, select, include});
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The course is enrolled successfully', [updatedStudent]));
	});
}