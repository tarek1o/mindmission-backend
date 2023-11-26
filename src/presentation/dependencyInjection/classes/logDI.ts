import { container } from '../container/DIContainer';
import { ILogRepository } from '../../../application/interfaces/IRepositories/ILogRepository';
import { LogRepository } from '../../../infrastructure/repositories/LogRepository';
import { ILogService } from '../../../application/interfaces/IServices/ILogService';
import { LogService } from '../../../application/services/LogService';
import { LogController } from '../../controllers/LogController';

container.bind<ILogRepository>('ILogRepository').to(LogRepository).inRequestScope();
container.bind<ILogService>('ILogService').to(LogService).inRequestScope();
container.bind<LogController>('LogController').to(LogController).inRequestScope();