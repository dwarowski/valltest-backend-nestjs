import { ApiHideProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import { ProblemsEntity } from 'src/entities/problems/problems.entity';

@Entity('answers')
export class AnswersEntity {
  @ApiHideProperty()
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
