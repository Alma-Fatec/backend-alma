import { In } from 'typeorm';
import { Assignment } from '../../entities/assignment';
import { assignmentRepository } from '../../repositories/assignment.repository';
import { classRepository } from '../../repositories/class.repository';

export class CreateAssignmentService {
    async execute(assignment: Assignment) {
        const classIds = assignment.class ?? [];

        const classes = await classRepository.findBy({
            id: In(classIds),
        });

        const newAssignment = assignmentRepository.create({
            ...assignment,
            class: classes,
            kind: assignment.kind ?? 'ALTERNATIVA',
        });

        await assignmentRepository.save(newAssignment);

        return newAssignment;
    }
}
