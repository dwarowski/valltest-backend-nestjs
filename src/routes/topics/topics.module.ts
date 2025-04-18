import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectEntity } from '../../entities/subjects/subject.entity'; // Импортируем SubjectEntity

import { TopicEntity } from '../../entities/topics/topic.entity';
import { TopicController } from './topics.controller';
import { TopicService } from '../../features/topics/topics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicEntity, SubjectEntity]), // Добавляем SubjectEntity
  ],
  providers: [TopicService],
  controllers: [TopicController],
  exports: [TopicService],
})
export class TopicsModule {}
