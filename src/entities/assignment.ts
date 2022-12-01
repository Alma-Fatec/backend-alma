import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { AssignmentType } from './assignmentType';
import { Class } from './class';

@Entity('assignment')
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'text' })
    public kind: AssignmentType;

    @Column({ nullable: true })
    file: string;

    @Column({ nullable: true })
    answer: string;

    @ManyToMany(() => Class, (classs) => classs.assignments)
    @JoinTable()
    class: Class[];

    @Column({ nullable: true })
    created_by: string;

    @Column({ nullable: true })
    updated_by: string;

    @Column('simple-json', { nullable: true })
    options: Options[];
}

interface Options {
    text: string;
    file?: string;
    isCorrect: boolean;
}
