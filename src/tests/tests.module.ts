import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { TestsEntity } from './entity/test.entity';
import { RatingService } from 'src/ratings/rating.service';
import { RatingEntity } from 'src/ratings/entity/rating.entity';
import { TopicEntity } from 'src/topics/entity/topic.entity';
import { TopicsService } from 'src/topics/topics.service';
import { SubjectEntity } from 'src/subjects/entity/subject.entity';
import { SubjectsService } from 'src/subjects/subjects.service';


@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TestsEntity, RatingEntity, TopicEntity, SubjectEntity])],
  controllers: [TestsController],
  providers: [TestsService, RatingService, TopicsService, SubjectsService]
})
export class TestsModule { }
