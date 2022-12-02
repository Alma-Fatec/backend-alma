import { In } from 'typeorm';
import { Assignment } from '../../entities/assignment';
import { assignmentRepository } from '../../repositories/assignment.repository';
import { classRepository } from '../../repositories/class.repository';
import { AssignmentType } from '../../entities/assignmentType';
import { ApiError } from '../../middlewares/error';
import AzureTextToSpeech from '../../infra/speech';

function isOnType(key: any): key is AssignmentType {
    return [
        'ALTERNATIVA_COM_IMAGENS',
        'ALTERNATIVA_COM_AUDIO',
        'DIGITAÇÃO',
    ].includes(key);
}
export class CreateAssignmentService {
    private speechService = AzureTextToSpeech.getInstance();

    async execute(assignment: Assignment) {
        const classIds = assignment.class ?? [];

        if (!isOnType(assignment.kind)) {
            throw new ApiError('Tipo de atividade inválido', 400);
        }

        if (assignment.kind == 'DIGITAÇÃO' && !assignment.answer) {
            throw new ApiError('Resposta da atividade não informada', 400);
        }

        if (assignment.kind == 'ALTERNATIVA_COM_IMAGENS' && !assignment.file) {
            throw new ApiError('Opções da atividade não informadas', 400);
        }

        if (
            assignment.kind == 'ALTERNATIVA_COM_AUDIO' &&
            !assignment.description
        ) {
            throw new ApiError('Texto para fala exige descrição', 400);
        }

        if (assignment.kind == 'ALTERNATIVA_COM_AUDIO' && !assignment.file) {
            const audio = await this.speechService.textToSpeech(
                assignment.description,
            );

            assignment.file = audio;
        }

        const classes = await classRepository.findBy({
            id: In(classIds),
        });

        const newAssignment = assignmentRepository.create({
            ...assignment,
            class: classes,
            kind: assignment.kind,
        });

        await assignmentRepository.save(newAssignment);

        return newAssignment;
    }
}
