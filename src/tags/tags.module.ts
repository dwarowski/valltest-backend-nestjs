import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsEntity } from './entity/tags.entity';
import { ConfigModule } from '@nestjs/config';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TestsEntity } from 'src/tests/entity/test.entity';
import { TestsService } from 'src/tests/tests.service';
import { RatingService } from 'src/ratings/rating.service';
import { TopicsService } from 'src/topics/topics.service';
import { RatingEntity } from 'src/ratings/entity/rating.entity';
import { TopicEntity } from 'src/topics/entity/topic.entity';
import { SubjectsService } from 'src/subjects/subjects.service';
import { SubjectEntity } from 'src/subjects/entity/subject.entity';
import { TestTagEntity } from 'src/test-tag/entity/test-tag.entity';
import { TestTagService } from 'src/test-tag/test-tag.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TagsEntity, TestsEntity, RatingEntity, TopicEntity, SubjectEntity, TestTagEntity])],
  controllers: [TagsController],
  providers: [TagsService, TestsService, RatingService, TopicsService, SubjectsService, TestTagService]
})
export class TagsModule { }
