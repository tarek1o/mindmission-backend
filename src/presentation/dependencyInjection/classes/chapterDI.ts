import { container } from '../container/DIContainer';
import { IChapterRepository } from '../../../application/interfaces/IRepositories/IChapterRepository';
import { ChapterRepository } from '../../../infrastructure/repositories/ChapterRepository';
import { IChapterService } from '../../../application/interfaces/IServices/IChapterService';
import { ChapterService } from '../../../application/services/ChapterService';
import { ChapterController } from '../../controllers/ChapterController';

container.bind<IChapterRepository>('IChapterRepository').to(ChapterRepository).inRequestScope();
container.bind<IChapterService>('IChapterService').to(ChapterService).inRequestScope();
container.bind<ChapterController>('ChapterController').to(ChapterController).inRequestScope();
