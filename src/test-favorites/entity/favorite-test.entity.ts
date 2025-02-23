import { ApiHideProperty } from '@nestjs/swagger';

import {
    Column,
    ManyToOne,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

import { TestsEntity } from 'src/tests/entity/test.entity';

@Entity('favorite-test')
export class FavoriteTestEntity {
    
    @ApiHideProperty()
    @PrimaryGeneratedColumn()
    id: number;
    
    //@ManyToOne(() => UserEntity, (user) => user.id)
    @Column()
    user: number

    @ManyToOne(() => TestsEntity, (test) => test.id)
    @Column()
    test: number
}