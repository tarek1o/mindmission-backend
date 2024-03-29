import { container } from '../container/DIContainer';
import { RoleRepository } from '../../../infrastructure/repositories/RoleRepository';
import { RoleService } from '../../../application/services/RoleService';
import { IRoleRepository } from '../../../application/interfaces/IRepositories/IRoleRepository';
import { IRoleService } from '../../../application/interfaces/IServices/IRoleService';
import { RoleController } from '../../controllers/RoleController';

container.bind<IRoleRepository>('IRoleRepository').to(RoleRepository).inSingletonScope();
container.bind<IRoleService>('IRoleService').to(RoleService).inSingletonScope();
container.bind<RoleController>('RoleController').to(RoleController).inSingletonScope();
