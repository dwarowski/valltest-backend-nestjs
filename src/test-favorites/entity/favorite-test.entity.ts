import { ApiHideProperty } from '@nestjs/swagger';

import {
    Column,
    ManyToOne,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

import { TestsEntity } from 'src/tests/entity/test.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('favorite-test')
export class FavoriteTestEntity {
    
    @ApiHideProperty()
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => User, (user) => user.id, {
        eager: true
    })
    user: User

    @ManyToOne(() => TestsEntity, (test) => test.id, {
        eager: true
    })
    test: TestsEntity
}