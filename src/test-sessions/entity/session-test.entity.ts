import { ApiHideProperty } from '@nestjs/swagger';

import {
    Column,
    ManyToOne,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

import { TestsEntity } from 'src/tests/entity/test.entity';

@Entity('session-test')
export class SessionTestEntity {
    
    @ApiHideProperty()
    @PrimaryGeneratedColumn()
    id: number;
    
    //@ManyToOne(() => UserEntity, (user) => user.id)
    @Column()
    user: number

    @ManyToOne(() => TestsEntity, (test) => test.id)
    @Column()
    test: number

    @Column()
    time_passed: Date
}