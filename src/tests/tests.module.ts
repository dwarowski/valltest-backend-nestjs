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
import { TestTagEntity } from 'src/test-tag/entity/test-tag.entity';
import { TestTagService } from 'src/test-tag/test-tag.service';


@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TestsEntity, RatingEntity, TopicEntity, SubjectEntity, TestTagEntity])],
  controllers: [TestsController],
  providers: [TestsService, RatingService, TopicsService, SubjectsService, TestTagService]
})
export class TestsModule { }
