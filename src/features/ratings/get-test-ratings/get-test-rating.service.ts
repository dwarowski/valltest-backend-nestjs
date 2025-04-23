import { Injectable, NotFoundException } from '@nestjs/common';
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
  async execute(testId: number) {
    const testRatings = await this.ratingRepository.find({
      where: { test: { id: testId } },
    });

    if(testRatings.length === 0) {
      throw new NotFoundException('No rating')
    }

    const cleanTestRatings = await Promise.all(
      testRatings.map((rating) => {
        const { id: _id, test: _test, user, ...cleanTestRating } = rating;
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
