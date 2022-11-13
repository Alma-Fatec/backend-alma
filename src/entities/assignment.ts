import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssignmentType } from './assignmentType';
import { Options } from './options';

@Entity('assignment')
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    kind: AssignmentType;

    @Column({ nullable: true })
    file: string;

    @Column({ nullable: true })
    answer: string;

    @OneToMany(() => Options, (options) => options.assignment)
    options: Options[];
}
