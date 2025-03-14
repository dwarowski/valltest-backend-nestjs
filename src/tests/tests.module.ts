import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { TestsEntity } from './entity/test.entity';
import { RatingService } from 'src/ratings/rating.service';
import { RatingEntity } from 'src/ratings/entity/rating.entity';
import { TopicEntity } from 'src/topics/entity/topic.entity';
import { TopicService } from 'src/topics/topics.service';
import { SubjectEntity } from 'src/subjects/entity/subject.entity';
import { SubjectService } from 'src/subjects/subjects.service';
import { User } from 'src/user/entities/user.entity';


@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TestsEntity, RatingEntity, TopicEntity, SubjectEntity, User])],
  controllers: [TestsController],
  providers: [TestsService, RatingService, TopicService, SubjectService]
})
export class TestsModule { }
