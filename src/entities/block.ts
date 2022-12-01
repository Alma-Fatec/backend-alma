import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { Class } from './class';
import { User } from './user';

interface BlockProps {
    title: string;
    description: string;
    cover: string;
    createdAt: string;
    users: User[];
    classes: any[];
}

@Entity('block')
export class Block {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text', nullable: true })
    cover: string;

    @Column({ type: 'date', nullable: true })
    createdAt: Date;

    @ManyToMany(() => User, (user) => user.blocks, {
        cascade: true,
        nullable: true,
        orphanedRowAction: 'nullify',
    })
    @JoinTable()
    users: User[];

    @OneToMany(() => Class, (classes) => classes.block, {
        nullable: true,
   
    })
    classes: Class[];

    @Column()
    created_by: string;

    constructor(props: BlockProps, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = v4();
        }
    }
}
