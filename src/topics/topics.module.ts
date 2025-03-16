import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicEntity } from './entity/topic.entity';
import { TopicService } from './topics.service';
import { TopicController } from './topics.controller';
import { SubjectEntity } from '../subjects/entity/subject.entity'; // Импортируем SubjectEntity

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicEntity, SubjectEntity]), // Добавляем SubjectEntity
  ],
  providers: [TopicService],
  controllers: [TopicController],
  exports: [TopicService]
})
export class TopicsModule {}
