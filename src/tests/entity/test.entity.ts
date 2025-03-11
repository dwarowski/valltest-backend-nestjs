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
import { TestTagEntity } from 'src/test-tag/entity/test-tag.entity';

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
    nullable: false
  })
  topic: TopicEntity;

  @Column()
  timeForTest: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(()=> TestTagEntity, (testTag) => testTag.test)
  testTag: TagsEntity[]

}
