import { Options } from '../entities/options';
import { AppDataSource } from '../infra/database/dataSource';

export const optionsRepository = AppDataSource.getRepository(Options);
