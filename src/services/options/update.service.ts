import { Options } from '../../entities/options';
import { optionsRepository } from '../../repositories/options.repository';

class UpdateOptionsService {
    async execute(id: number, body: Options) {
        const options = await optionsRepository.findOne({
            where: {
                id,
            },
        });
        if (!options) {
            throw new Error('Opção não encontrada');
        }
        const newOptions = optionsRepository.merge(options, body);
        await optionsRepository.save(newOptions);
        return newOptions;
    }
}

export { UpdateOptionsService };
