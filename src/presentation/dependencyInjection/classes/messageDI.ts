import { container } from '../container/DIContainer';
import { IMessageRepository } from '../../../application/interfaces/IRepositories/IMessageRepository';
import { MessageRepository } from '../../../infrastructure/repositories/MessageRepository';
import { IMessageService } from '../../../application/interfaces/IServices/IMessageService';
import { MessageService } from '../../../application/services/MessageService';
import { MessageController } from '../../controllers/MessageController';

container.bind<IMessageRepository>('IMessageRepository').to(MessageRepository).inRequestScope();
container.bind<IMessageService>('IMessageService').to(MessageService).inRequestScope();
container.bind<MessageController>('MessageController').to(MessageController).inRequestScope();
