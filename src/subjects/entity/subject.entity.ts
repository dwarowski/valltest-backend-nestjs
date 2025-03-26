import { ApiHideProperty } from '@nestjs/swagger';
import { TopicEntity } from 'src/topics/entity/topic.entity';
import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
