import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectEntity } from '../../entities/subjects/subject.entity'; // Импортируем SubjectEntity

import { TopicEntity } from '../../entities/topics/topic.entity';
import { TopicController } from './topics.controller';
import { CreateTopicService } from 'src/features/topics/create-topic/create-topics.service';
import { DeleteTopicService } from 'src/features/topics/delete-topic/delete-topics.service';
import { GetTopicService } from 'src/features/topics/get-topic/get-topics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicEntity, SubjectEntity]), // Добавляем SubjectEntity
  ],
  providers: [CreateTopicService, DeleteTopicService, GetTopicService],
  controllers: [TopicController],
  exports: [GetTopicService],
})
export class TopicsModule {}
