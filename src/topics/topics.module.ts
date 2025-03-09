import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicEntity } from './entity/topic.entity';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { SubjectEntity } from 'src/subjects/entity/subject.entity';
import { SubjectsService } from 'src/subjects/subjects.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TopicEntity, SubjectEntity])],
  controllers: [TopicsController],
  providers: [TopicsService, SubjectsService]
})
export class TopicsModule {}
