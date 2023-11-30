import { container } from '../container/DIContainer';
import { IVideoRepository } from '../../../application/interfaces/IRepositories/IVideoRepository';
import { VideoRepository } from '../../../infrastructure/repositories/VideoRepository';
import { IVideoService } from '../../../application/interfaces/IServices/IVideoService';
import { VideoService } from '../../../application/services/VideoService';
import { VideoController } from '../../controllers/VideoController';

container.bind<IVideoRepository>('IVideoRepository').to(VideoRepository).inRequestScope();
container.bind<IVideoService>('IVideoService').to(VideoService).inRequestScope();
container.bind<VideoController>('VideoController').to(VideoController).inRequestScope();
