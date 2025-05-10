import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateRatingDto } from '../../features/ratings/add-rating/create-rating.dto';
import { AddRatingService } from 'src/features/ratings/add-rating/add-rating.service';
import { GetTestRatingService } from 'src/features/ratings/get-test-ratings/get-test-rating.service';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TestRatingDto } from 'src/features/ratings/get-test-ratings/test-rating.dto';

ApiTags('Ratings');
@Controller('ratings')
export class RatingController {
  constructor(
    private readonly addRatingService: AddRatingService,
    private readonly getRatingByTestService: GetTestRatingService,
  ) {}

  // Добавить оценку к тесту
  @Post()
  @ApiOperation({
    summary: 'User add rating',
    description: 'User add rating and review for test',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  async addRating(
    @Req() req: Request,
    @Body() createRatingDto: CreateRatingDto,
  ): Promise<void> {
    return this.addRatingService.execute(createRatingDto, req);
  }

  // Получить все оценки для теста
  @Get('/tests/:testId')
  @ApiOperation({
    summary: 'Test reviews',
    description: 'Test reviews and ratings',
  })
  async getRatingsByTest(
    @Param('testId', ParseIntPipe) testId: number,
  ): Promise<TestRatingDto[]> {
    return this.getRatingByTestService.execute(testId);
  }
}
