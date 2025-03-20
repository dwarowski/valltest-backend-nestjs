import { ApiHideProperty } from '@nestjs/swagger';
import { ProblemsEntity } from 'src/problems/entity/problems.entity';
import { UserAnswersEntity } from 'src/user-answers/entity/user-answer.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  Column,
} from 'typeorm';

@Entity('answers')
export class AnswersEntity {
  @ApiHideProperty()
  @OneToOne(() => UserAnswersEntity, (UserAnswer) => UserAnswer.answer)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => ProblemsEntity, (problem) => problem.id, {
    onDelete: 'CASCADE',
  })
  problem: number;

  @Column()
  is_correct: boolean;
}
