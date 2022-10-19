import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 } from 'uuid';
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
    public readonly id: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text', nullable: true })
    cover: string;

    @Column({ type: 'date', default: new Date() })
    createdAt: Date;

    @ManyToMany(() => User, (user) => user.blocks, { cascade: true })
    @JoinTable()
    users: User[];

    // write constructor to initialize the properties of the class with the values passed in the constructor parameters

    constructor(props: BlockProps, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = v4();
        }
    }
}
