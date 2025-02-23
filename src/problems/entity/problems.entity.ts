import { ApiHideProperty } from '@nestjs/swagger';

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';

import { TestsEntity } from 'src/tests/entity/test.entity';

@Entity('problems')
export class ProblemsEntity {
    
    @ApiHideProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TestsEntity, (test) => test.id)
    test: number
    
    @Column()
    question: string

}