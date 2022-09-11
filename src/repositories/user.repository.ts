import { User } from '../entities/user';
import { AppDataSource } from '../infra/database/dataSource';

export const userRepository = AppDataSource.getRepository(User);
