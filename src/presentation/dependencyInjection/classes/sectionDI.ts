import { container } from '../container/DIContainer';
import { ISectionRepository } from '../../../application/interfaces/IRepositories/ISectionRepository';
import { SectionRepository } from '../../../infrastructure/repositories/SectionRepository';
import { ISectionService } from '../../../application/interfaces/IServices/ISectionService';
import { SectionService } from '../../../application/services/SectionService';
import { SectionController } from '../../controllers/SectionController';

container.bind<ISectionRepository>('ISectionRepository').to(SectionRepository).inRequestScope();
container.bind<ISectionService>('ISectionService').to(SectionService).inRequestScope();
container.bind<SectionController>('SectionController').to(SectionController).inRequestScope();
