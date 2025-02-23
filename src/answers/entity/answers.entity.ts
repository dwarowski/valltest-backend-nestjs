import { ApiHideProperty } from '@nestjs/swagger';
import { ProblemsEntity } from 'src/problems/entity/problems.entity';
import { UserAnswersEntity } from 'src/user-answers/entity/user-answer.entity';

import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
    Column
} from 'typeorm';


@Entity('answers')
export class AnswersEntity{
    @ApiHideProperty()
    @PrimaryGeneratedColumn()
    @OneToOne(() => UserAnswersEntity, (UserAnswer) => UserAnswer.answer)
    id: number;

    @Column()
    value: string

    @ManyToOne(() => ProblemsEntity, (problem) => problem.id)
    problem: number

    @Column()
    is_correct: boolean
}