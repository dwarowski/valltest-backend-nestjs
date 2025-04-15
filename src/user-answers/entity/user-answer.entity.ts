import { ApiHideProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { AnswersEntity } from 'src/answers/entity/answers.entity';
import { ProblemsEntity } from 'src/problems/entity/problems.entity';
import { SessionTestEntity } from 'src/test-sessions/entity/session-test.entity';

@Entity('user-answers')
export class UserAnswersEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProblemsEntity, (problem) => problem.id)
  problem: number;

  @OneToOne(() => AnswersEntity, (answer) => answer.id)
  @JoinColumn()
  answer: number;

  @ManyToOne(() => SessionTestEntity, (test_session) => test_session.id)
  session: number;
}
