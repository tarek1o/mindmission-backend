import { Prisma } from "@prisma/client"
import {inject, injectable } from "inversify"
import { IPaymentService } from "../interfaces/IServices/IPaymentService"
import { IPaymentRepository } from "../interfaces/IRepositories/IPaymentRepository"
import { CreatePayment, UpdatePayment } from "../inputs/paymentInput"
import { ICourseService } from "../interfaces/IServices/ICourseService"
import { ICouponService } from "../interfaces/IServices/ICouponService"
import { ExtendedPayment } from "../types/ExtendedPayment"
import APIError from "../../presentation/errorHandlers/APIError"
import HttpStatusCode from "../../presentation/enums/HTTPStatusCode"

@injectable()
export class PaymentService implements IPaymentService {
	constructor(@inject('IPaymentRepository') private paymentRepository: IPaymentRepository, @inject('ICourseService') private courseService: ICourseService, @inject('ICouponService') private couponService: ICouponService) {}

	private async getCouponDiscount(couponCode: string): Promise<number> {
		const coupon = await this.couponService.findUnique({
			where: {
				code: couponCode
			},
			include: {
				payments: true
			}
		});
		if(coupon && coupon.expiredAt >= new Date()) {
			return coupon.discount;
		}
		return 0
	}

	count(args: Prisma.PaymentCountArgs): Promise<number> {
		return this.paymentRepository.count(args);
	};

	findMany(args: Prisma.PaymentFindManyArgs): Promise<ExtendedPayment[]> {
		return this.paymentRepository.findMany(args);
	};

	findUnique(args: Prisma.PaymentFindUniqueArgs): Promise<ExtendedPayment | null> {
		return this.paymentRepository.findUnique(args);
	};

  async create(args: {data: CreatePayment, select?: Prisma.PaymentSelect, include?: Prisma.PaymentInclude}): Promise<ExtendedPayment> {
		const {currency, paymentMethod, paymentUnits, userId, couponCode} = args.data;		
		const courses = await this.courseService.findMany({
			where: {
				id: {
					in: paymentUnits
				}
			},
			select: {
				id: true,
				price: true
			}
		});
		if(courses.length !== paymentUnits.length) {
			throw new APIError("One of the courses is not exist", HttpStatusCode.BadRequest);
		}
		const totalPrice = courses.reduce((acc, curr) => {
			return acc + curr.price
		}, 0);
		let discount = couponCode ? await this.getCouponDiscount(couponCode) : 0;
		return this.paymentRepository.create({
			data: {
				currency,
				paymentMethod,
				totalPrice,
				discount,
				paymentUnits: {
					create: courses.map(({id, price}) => {
						return {
							price,
							courseId: id,
						}
					})
				},
				coupon: couponCode ? {
					connect: {
						code: couponCode
					}
				} : undefined,
				student: {
					connect: {
						userId: userId
					}
				}
			},
			select: args.select,
			include: args.include
    });
	};

	async update(args: {data: UpdatePayment, select?: Prisma.PaymentSelect, include?: Prisma.PaymentInclude}): Promise<ExtendedPayment> {
		const {id, currency, status} = args.data;
		return this.paymentRepository.update({
			where: {
				id
			},
			data: {
				currency: currency || undefined,
				status: status || undefined
			},
			select: args.select,
			include: args.include
		});
	};

	deleteNotCompletedPayment(id: number) {
		setTimeout(async () => {
			const payment = await this.paymentRepository.findUnique({
				where: {
					id
				},
				select: {
					status: true
				}
			});
			if(payment && payment.status !== "COMPLETE") {
				await this.delete(id);
			}
		}, 1000 * 60 * 11); // 11 Min
	};

	delete(id: number): Promise<ExtendedPayment> {
		return this.paymentRepository.delete(id);
	};
}