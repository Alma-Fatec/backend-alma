import { Assignment } from '../entities/assignment';
import { AppDataSource } from '../infra/database/dataSource';

export const assignmentRepository = AppDataSource.getRepository(Assignment);
