import { ApiHideProperty } from '@nestjs/swagger';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { TopicEntity } from 'src/topics/entity/topic.entity';
import { RatingEntity } from '../../ratings/entity/rating.entity';

@Entity('tests')
export class TestsEntity {
  
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  testName: string;

  @Column()
  userAuthorId: number;

  @Column()
  difficulty: number;

  @ManyToOne(() => TopicEntity, (topic) => topic.id, {
    eager: true,
  })
  topic: number;

  @Column()
  timeForTest:  number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];
}
