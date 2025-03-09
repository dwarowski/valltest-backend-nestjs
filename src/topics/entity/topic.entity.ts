import { ApiHideProperty } from '@nestjs/swagger';

import {
    Column,
    OneToMany,
    ManyToOne,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

import { TestsEntity } from "src/tests/entity/test.entity"
import { SubjectEntity } from "src/subjects/entity/subject.entity"


@Entity('topic')
export class TopicEntity {
    
    @ApiHideProperty()
    @OneToMany(() => TestsEntity, (test) => test.topic)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    topicName: string
    
    @ManyToOne(() => SubjectEntity, (subject) => subject.id, {
        eager: true,
    })
    subject: SubjectEntity;

}
