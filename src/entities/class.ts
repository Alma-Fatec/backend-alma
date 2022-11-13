// create a new typeorm entity class

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

    // every class may have one block
    @ManyToOne(() => Block, (block) => block.classes)
    block: Block[];
}
