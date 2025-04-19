import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RatingEntity } from '../../../entities/ratings/rating.entity';

@Injectable()
export class GetTestRatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
  ) {}

  // Получить все оценки для теста
  async getRatingsByTest(testId: number) {
    const testRatings = await this.ratingRepository.find({
      where: { test: { id: testId } },
    });

    const cleanTestRatings = await Promise.all(
      testRatings.map((rating) => {
        const { id, user, ...cleanTestRating } = rating;
        return {
          ...cleanTestRating,
          user: {
            username: user.username,
            avatar_location: user.avatar_location,
          },
        };
      }),
    );

    return cleanTestRatings;
  }
}
