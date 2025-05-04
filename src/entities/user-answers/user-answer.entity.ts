import { ApiHideProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { AnswersEntity } from 'src/entities/answers/answers.entity';
import { ProblemsEntity } from 'src/entities/problems/problems.entity';
import { SessionTestEntity } from 'src/entities/test-sessions/session-test.entity';
import { User } from '../users/user.entity';
import { TestsEntity } from '../tests/test.entity';

@Entity('user-answers')
export class UserAnswersEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestsEntity, (test) => test.id, { onDelete: 'CASCADE' })
  test: TestsEntity;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => ProblemsEntity, (problem) => problem.id)
  problem: ProblemsEntity;

  @ManyToOne(() => AnswersEntity, (answer) => answer.id)
  answer: AnswersEntity;

  @ManyToOne(() => SessionTestEntity, (test_session) => test_session.id)
  session: SessionTestEntity;
}
