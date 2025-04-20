import { ApiHideProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { TestTagEntity } from 'src/entities/test-tag/test-tag.entity';
import { TopicEntity } from 'src/entities/topics/topic.entity';

import { RatingEntity } from '../ratings/rating.entity';
import { ProblemsEntity } from 'src/entities/problems/problems.entity';

@Entity('tests')
export class TestsEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  testName: string;

  @Column('uuid')
  userAuthorId: string;

  @Column()
  difficulty: string;

  @ManyToOne(() => TopicEntity, (topic) => topic.id, {
    eager: true,
    nullable: false,
  })
  topic: TopicEntity;

  @Column()
  timeForTest: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];

  @OneToMany(() => TestTagEntity, (testTag) => testTag.test)
  testTag: TestTagEntity[];

  @OneToMany(() => ProblemsEntity, (problems) => problems.test)
  problems: ProblemsEntity[];
}
