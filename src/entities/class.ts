// create a new typeorm entity class

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
} from 'typeorm';
import { Assignment } from './assignment';
import { Block } from './block';

@Entity('class')
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    cover: string;

    @ManyToOne(() => Block, (block) => block.classes, {
        nullable: true,
        onDelete: 'CASCADE',
        orphanedRowAction: 'nullify',
    })
    block: Block[];

    @ManyToMany(() => Assignment, (assignment) => assignment.class, {
        nullable: true,
    })
    assignments: Assignment[];

    @Column({ nullable: true })
    created_by: string;

    @Column({ nullable: true })
    updated_by: string;
}
