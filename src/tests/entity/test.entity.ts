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
import { TagsEntity } from 'src/tags/entity/tags.entity';

@Entity('tests')
export class TestsEntity {
  
  @ApiHideProperty()
  @OneToMany(()=>TagsEntity, (tag) => tag.test)
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

}
