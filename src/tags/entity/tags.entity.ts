import { ApiHideProperty } from '@nestjs/swagger';

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';

import { TestsEntity } from 'src/tests/entity/test.entity';

@Entity('tags')
export class TagsEntity {
    
    @ApiHideProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TestsEntity, (test) => test.id)
    test: number
    
    @Column()
    tag: string

}