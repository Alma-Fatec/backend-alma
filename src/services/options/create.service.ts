import { Options } from '../../entities/options';
import { optionsRepository } from '../../repositories/options.repository';

class CreateOptionsService {
    async execute(body: Options) {
        const options = optionsRepository.create(body);
        await optionsRepository.save(options);
        return options;
    }
}

export { CreateOptionsService };
