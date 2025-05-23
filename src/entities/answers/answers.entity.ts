import { ApiHideProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToOne,
} from 'typeorm';

import { ProblemsEntity } from 'src/entities/problems/problems.entity';
import { UserAnswersEntity } from '../user-answers/user-answer.entity';

@Entity('answers')
export class AnswersEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column({ select: false })
  is_correct?: boolean;

  @OneToOne(() => UserAnswersEntity, (userAnswers) => userAnswers.answer)
  userAnswer?: UserAnswersEntity;

  @ManyToOne(() => ProblemsEntity, (problem) => problem.id, {
    onDelete: 'CASCADE',
  })
  problem?: ProblemsEntity;
}
