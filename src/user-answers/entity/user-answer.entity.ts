import { ApiHideProperty } from '@nestjs/swagger';
import { ProblemsEntity } from 'src/problems/entity/problems.entity';
import { SessionTestEntity } from 'src/test-sessions/entity/session-test.entity';

import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';


@Entity('problems')
export class UserAnswersEntity {
    @ApiHideProperty()
    @PrimaryGeneratedColumn()
    id: number;

    
    @ManyToOne(() => ProblemsEntity, (problem) => problem.id)
    problem: number
    
    
    @OneToMany(() => AnswerEntity, (answer) => answer.id)
    answer: number
    

    @ManyToOne(() => SessionTestEntity, (test_session) => test_session.id)
    session: number
    

}
    