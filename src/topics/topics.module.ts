import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectEntity } from '../subjects/entity/subject.entity'; // Импортируем SubjectEntity

import { TopicEntity } from './entity/topic.entity';
import { TopicController } from './topics.controller';
import { TopicService } from './topics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicEntity, SubjectEntity]), // Добавляем SubjectEntity
  ],
  providers: [TopicService],
  controllers: [TopicController],
  exports: [TopicService],
})
export class TopicsModule {}
