import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatingEntity } from '../../entities/ratings/rating.entity';
import { RatingController } from './rating.controller';
import { AddRatingService } from 'src/features/ratings/add-rating/add-rating.service';
import { GetTestsAverageRatingService } from 'src/features/ratings/get-tests-average-rating/get-tests-average-rating.service';
import { GetTestRatingService } from 'src/features/ratings/get-test-ratings/get-test-rating.service';
import { UserModule } from '../users/user.module';
import { TestsModule } from '../tests/tests.module';

@Module({
  imports: [UserModule, TestsModule, TypeOrmModule.forFeature([RatingEntity])],
  providers: [
    AddRatingService,
    GetTestsAverageRatingService,
    GetTestRatingService,
  ],
  controllers: [RatingController],
  exports: [GetTestsAverageRatingService],
})
export class RatingModule {}
