import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Импортируем SubjectEntity

import { TopicEntity } from '../../entities/topics/topic.entity';
import { TopicController } from './topics.controller';
import { CreateTopicService } from 'src/features/topics/create-topic/create-topics.service';
import { DeleteTopicService } from 'src/features/topics/delete-topic/delete-topics.service';
import { GetTopicService } from 'src/features/topics/get-topic/get-topics.service';
import { SubjectsModule } from '../subjects/subjects.module';

@Module({
  imports: [SubjectsModule, TypeOrmModule.forFeature([TopicEntity])],
  providers: [CreateTopicService, DeleteTopicService, GetTopicService],
  controllers: [TopicController],
  exports: [GetTopicService],
})
export class TopicsModule {}
