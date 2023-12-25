import { container } from '../container/DIContainer';
import { IPaymentRepository } from '../../../application/interfaces/IRepositories/IPaymentRepository';
import { PaymentRepository } from '../../../infrastructure/repositories/PaymentRepository';
import { IPaymentService } from '../../../application/interfaces/IServices/IPaymentService';
import { PaymentService } from '../../../application/services/PaymentService';

container.bind<IPaymentRepository>('IPaymentRepository').to(PaymentRepository).inRequestScope();
container.bind<IPaymentService>('IPaymentService').to(PaymentService).inRequestScope();