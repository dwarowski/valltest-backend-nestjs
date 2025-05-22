import { ApiHideProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { TestsEntity } from 'src/entities/tests/test.entity';
import { AnswersEntity } from 'src/entities/answers/answers.entity';

@Entity('problems')
export class ProblemsEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @OneToMany(() => AnswersEntity, (answer) => answer.problem, {
    onDelete: 'CASCADE',
  })
  answers?: AnswersEntity[];

  @ManyToOne(() => TestsEntity, (test) => test.id, { onDelete: 'CASCADE' })
  test?: TestsEntity;
}
