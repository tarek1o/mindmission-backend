import { container } from '../container/DIContainer';
import { ILessonRepository } from '../../../application/interfaces/IRepositories/ILessonRepository';
import { LessonRepository } from '../../../infrastructure/repositories/LessonRepository';
import { ILessonService } from '../../../application/interfaces/IServices/ILessonService';
import { LessonService } from '../../../application/services/LessonService';
import { LessonController } from '../../controllers/LessonController';

container.bind<ILessonRepository>('ILessonRepository').to(LessonRepository).inRequestScope();
container.bind<ILessonService>('ILessonService').to(LessonService).inRequestScope();
container.bind<LessonController>('LessonController').to(LessonController).inRequestScope();
