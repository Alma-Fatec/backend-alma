import { Class } from '../entities/class';
import { AppDataSource } from '../infra/database/dataSource';

export const classRepository = AppDataSource.getRepository(Class);
