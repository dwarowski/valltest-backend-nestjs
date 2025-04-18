import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from '../../../entities/tests/test.entity';
import { User } from 'src/entities/users/user.entity';

import { RatingEntity } from '../../../entities/ratings/rating.entity';
 
@Injectable()
export class GetTestRatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>
  ) {}

  // Получить все оценки для теста
  async getRatingsByTest(testId: number): Promise<RatingEntity[]> {
    return this.ratingRepository.find({
      where: { test: { id: testId } },
      relations: ['user'], // Подгружаем информацию о пользователе
    });
  }
}
