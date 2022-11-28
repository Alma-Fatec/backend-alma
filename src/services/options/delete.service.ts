import { optionsRepository } from '../../repositories/options.repository';

class DeleteOptionsService {
    async execute(id: number) {
        const options = await optionsRepository.findOne({
            where: {
                id,
            },
        });
        if (!options) {
            throw new Error('Opção não encontrada');
        }
        await optionsRepository.delete(id);
        return options;
    }
}

export { DeleteOptionsService };
