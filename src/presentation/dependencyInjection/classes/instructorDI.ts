import { container } from '../container/DIContainer';
import { IInstructorRepository } from '../../../application/interfaces/IRepositories/IInstructorRepository';
import { InstructorRepository } from '../../../infrastructure/repositories/InstructorRepository';
import { IInstructorService } from '../../../application/interfaces/IServices/IInstructorService';
import { InstructorService } from '../../../application/services/InstructorService';
import { InstructorController } from '../../controllers/InstructorController';

container.bind<IInstructorRepository>('IInstructorRepository').to(InstructorRepository).inRequestScope();
container.bind<IInstructorService>('IInstructorService').to(InstructorService).inRequestScope();
container.bind<InstructorController>('InstructorController').to(InstructorController).inRequestScope();
