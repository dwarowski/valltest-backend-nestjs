import { ApiHideProperty } from '@nestjs/swagger';
import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TopicEntity } from 'src/entities/topics/topic.entity';

@Entity('subject')
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  subjectName: string;

  @ApiHideProperty()
  @OneToMany(() => TopicEntity, (topic) => topic.subject)
  topics: TopicEntity[];
}
