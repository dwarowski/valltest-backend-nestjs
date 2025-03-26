import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingEntity } from './entity/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  // Добавить оценку к тесту
  @Post()
  async addRating(
    @Body() createRatingDto: CreateRatingDto,
  ): Promise<RatingEntity> {
    return this.ratingService.addRating(createRatingDto);
  }

  // Получить все оценки для теста
  @Get('/tests/:testId')
  async getRatingsByTest(
    @Param('testId') testId: number,
  ): Promise<RatingEntity[]> {
    return this.ratingService.getRatingsByTest(testId);
  }

  // Получить средний рейтинг теста
  @Get('/tests/:testId/average')
  async getAverageRating(@Param('testId') testId: number): Promise<number> {
    return this.ratingService.getAverageRating(testId);
  }
}
