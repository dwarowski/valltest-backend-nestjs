import { ApiHideProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  Column,
} from 'typeorm';

import { ProblemsEntity } from 'src/entities/problems/problems.entity';
import { UserAnswersEntity } from 'src/entities/user-answers/user-answer.entity';

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
