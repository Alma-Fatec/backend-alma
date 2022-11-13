import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Assignment } from './assignment';

@Entity('options')
export class Options {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ nullable: true })
    file: string;

    @Column({ type: 'boolean' })
    is_correct: string;

    @ManyToOne(() => Assignment, (assignment) => assignment.options)
    assignment: Assignment;
}
