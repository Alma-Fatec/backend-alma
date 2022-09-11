import { Block } from '../entities/block';
import { AppDataSource } from '../infra/database/dataSource';

export const blockRepository = AppDataSource.getRepository(Block);
