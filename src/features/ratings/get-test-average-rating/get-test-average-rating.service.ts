import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RatingEntity } from '../../../entities/ratings/rating.entity';

@Injectable()
export class GetTestAverageRatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
  ) {}

  // Получить средний рейтинг теста
  async getAverageRating(testId: number): Promise<number> {
    const result = await this.ratingRepository
      .createQueryBuilder('rating')
      .select('AVG(rating.rating)', 'average')
      .where('rating.testId = :testId', { testId })
      .getRawOne();
    return parseFloat(result.average) || 0;
  }
}
