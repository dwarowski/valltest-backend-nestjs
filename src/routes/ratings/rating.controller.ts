import { Controller, Post, Body, Get, Param, Req, ParseIntPipe } from '@nestjs/common';

import { CreateRatingDto } from '../../features/ratings/add-rating/create-rating.dto';
import { AddRatingService } from 'src/features/ratings/add-rating/add-rating.service';
import { GetTestRatingService } from 'src/features/ratings/get-test-ratings/get-test-rating.service';
import { Request } from 'express';

@Controller('ratings')
export class RatingController {
  constructor(
    private readonly addRatingService: AddRatingService,
    private readonly getRatingByTestService: GetTestRatingService,
  ) {}

  // Добавить оценку к тесту
  @Post()
  async addRating(
    @Req() req: Request,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    return this.addRatingService.execute(createRatingDto, req);
  }

  // Получить все оценки для теста
  @Get('/tests/:testId')
  async getRatingsByTest(@Param('testId', ParseIntPipe) testId: number) {
    return this.getRatingByTestService.execute(testId);
  }
}
