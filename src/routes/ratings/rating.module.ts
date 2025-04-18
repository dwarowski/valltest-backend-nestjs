import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestsEntity } from '../../entities/tests/test.entity'; // Импортируем TestsEntity
import { User } from 'src/entities/users/user.entity'; // Импортируем User

import { RatingEntity } from '../../entities/ratings/rating.entity';
import { RatingController } from './rating.controller';
import { AddRatingService } from 'src/features/ratings/add-rating/add-rating.service';
import { GetTestAverageRatingService } from 'src/features/ratings/get-test-average-rating/get-test-average-rating.service';
import { GetTestRatingService } from 'src/features/ratings/get-test-ratings/get-test-rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity, User, TestsEntity])],
  providers: [AddRatingService, GetTestAverageRatingService, GetTestRatingService],
  controllers: [RatingController],
  exports: [GetTestAverageRatingService],
})
export class RatingModule {}
