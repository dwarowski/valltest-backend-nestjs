import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tags')
export class TagsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string

}