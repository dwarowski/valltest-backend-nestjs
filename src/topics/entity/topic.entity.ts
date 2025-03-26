import { ApiHideProperty } from '@nestjs/swagger';
import {
  Column,
  OneToMany,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SubjectEntity } from 'src/subjects/entity/subject.entity';
import { TestsEntity } from 'src/tests/entity/test.entity';

@Entity('topic')
export class TopicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  topicName: string;

  @ApiHideProperty()
  @OneToMany(() => TestsEntity, (test) => test.topic)
  tests: TestsEntity[];

  @ManyToOne(() => SubjectEntity, (subject) => subject.topics, {
    eager: true,
  })
  subject: SubjectEntity;
}
