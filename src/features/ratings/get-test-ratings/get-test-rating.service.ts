import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RatingEntity } from '../../../entities/ratings/rating.entity';
import { TestRatingDto } from './test-rating.dto';

@Injectable()
export class GetTestRatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
  ) {}

  // Получить все оценки для теста
  async execute(testId: number): Promise<TestRatingDto[]> {
    const testRatings: TestRatingDto[] = await this.ratingRepository.find({
      where: { test: { id: testId } },
      relations: ['user'],
      select: {
        user: {
          username: true,
          avatar_location: true,
        },
      },
    });

    if (testRatings.length === 0) {
      throw new NotFoundException('No rating');
    }

    return testRatings;
  }
}
