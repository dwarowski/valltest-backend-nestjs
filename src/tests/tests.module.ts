import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { TestsEntity } from './entity/test.entity';
import { RatingService } from 'src/ratings/rating.service';
import { RatingEntity } from 'src/ratings/entity/rating.entity';


@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TestsEntity, RatingEntity])],
  controllers: [TestsController],
  providers: [TestsService, RatingService]
})
export class TestsModule {}
