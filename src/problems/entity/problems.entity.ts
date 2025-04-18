import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { TestsEntity } from 'src/tests/entity/test.entity';
import { AnswersEntity } from 'src/answers/entity/answers.entity';

@Entity('problems')
export class ProblemsEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestsEntity, (test) => test.id, { onDelete: 'CASCADE' })
  test: number;

  @Column()
  question: string;

  @OneToMany(() => AnswersEntity, (answer) => answer.problem, { onDelete: 'CASCADE' })
  answers: AnswersEntity[];

}
