import { container } from '../container/DIContainer';
import { ICommentRepository } from '../../../application/interfaces/IRepositories/ICommentRepository';
import { CommentRepository } from '../../../infrastructure/repositories/CommentRepository';
import { ICommentService } from '../../../application/interfaces/IServices/ICommentService';
import { CommentService } from '../../../application/services/CommentService';
import { CommentController } from '../../controllers/CommentController';

container.bind<ICommentRepository>('ICommentRepository').to(CommentRepository).inRequestScope();
container.bind<ICommentService>('ICommentService').to(CommentService).inRequestScope();
container.bind<CommentController>('CommentController').to(CommentController).inRequestScope();