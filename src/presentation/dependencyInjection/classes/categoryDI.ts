import { container } from '../container/DIContainer';
import { ICategoryRepository } from '../../../application/interfaces/IRepositories/ICategoryRepository';
import { CategoryRepository } from '../../../infrastructure/repositories/CategoryRepository';
import { ICategoryService } from '../../../application/interfaces/IServices/ICategoryService';
import { CategoryService } from '../../../application/services/CategoryService';
import { CategoryController } from '../../controllers/CategoryController';

container.bind<ICategoryRepository>('ICategoryRepository').to(CategoryRepository).inRequestScope();
container.bind<ICategoryService>('ICategoryService').to(CategoryService).inRequestScope();
container.bind<CategoryController>('CategoryController').to(CategoryController).inRequestScope();
