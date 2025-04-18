import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { CreateRatingDto } from '../../features/ratings/add-rating/create-rating.dto';
import { RatingEntity } from '../../entities/ratings/rating.entity';
import { AddRatingService } from 'src/features/ratings/add-rating/add-rating.service';
import { GetTestRatingService } from 'src/features/ratings/get-test-ratings/get-test-rating.service';

@Controller('ratings')
export class RatingController {
  constructor(
    private readonly addRatingService: AddRatingService,
    private readonly getRatingByTestService: GetTestRatingService
  ) { }

  // Добавить оценку к тесту
  @Post()
  async addRating(
    @Body() createRatingDto: CreateRatingDto,
  ): Promise<RatingEntity> {
    return this.addRatingService.addRating(createRatingDto);
  }

  // Получить все оценки для теста
  @Get('/tests/:testId')
  async getRatingsByTest(
    @Param('testId') testId: number,
  ): Promise<RatingEntity[]> {
    return this.getRatingByTestService.getRatingsByTest(testId);
  }
}
