import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RatingEntity } from '../../../entities/ratings/rating.entity';

@Injectable()
export class GetTestsAverageRatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
  ) {}

  // Получить средний рейтинг теста
  async execute(testIds: number[]): Promise<{ [testId: number]: number }> {
    const results = await this.ratingRepository
      .createQueryBuilder('rating')
      .select('rating.testId', 'testId')
      .addSelect('AVG(rating.rating)', 'average')
      .where('rating.testId IN (:...testIds)', { testIds })
      .groupBy('rating.testId')
      .getRawMany();

    // Преобразуем массив результатов в объект
    const ratingsMap: { [testId: number]: number } = {};
    results.forEach((row) => {
      ratingsMap[parseInt(row.testId, 10)] = parseFloat(row.average);
    });

    // Для тестов без рейтингов установим 0 или null
    testIds.forEach((id) => {
      if (!(id in ratingsMap)) {
        ratingsMap[id] = 0; // или null, если предпочтительнее
      }
    });

    return ratingsMap;
  }
}
