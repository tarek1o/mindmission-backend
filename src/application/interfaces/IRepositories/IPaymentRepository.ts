import { IRepository } from "./Base/IRepository";
import { ExtendedPayment } from "../../types/ExtendedPayment";

export interface IPaymentRepository extends IRepository<ExtendedPayment> {
}