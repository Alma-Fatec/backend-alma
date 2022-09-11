import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './roles';
import { v4 } from 'uuid';
import { Block } from './block';
interface UserProps {
    name: string;
    socialName: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
    isActive: boolean;
    role: Roles;
    blocks: Block[];
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    socialName: string;

    @Column({ type: 'text' })
    cpf: string;

    @Column({ type: 'text' })
    phone: string;

    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'boolean' })
    isActive: boolean;

    @Column({ type: 'text' })
    public role: Roles;

    @ManyToMany(() => Block, (block) => block.users)
    blocks: Block[];
    // write constructor to initialize the properties of the class with the values passed in the constructor parameters

    constructor(props: UserProps, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = v4();
        }
    }
}
