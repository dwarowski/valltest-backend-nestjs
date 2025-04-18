import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from '../../../entities/tests/test.entity';
import { User } from 'src/entities/users/user.entity';

import { CreateRatingDto } from './create-rating.dto';
import { RatingEntity } from '../../../entities/ratings/rating.entity';
 
@Injectable()
export class AddRatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TestsEntity)
    private readonly testRepository: Repository<TestsEntity>,
  ) {}

  // Добавить оценку к тесту
  async addRating(createRatingDto: CreateRatingDto): Promise<RatingEntity> {
    const user = await this.userRepository.findOne({
      where: { id: createRatingDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createRatingDto.userId} not found`,
      );
    }

    const test = await this.testRepository.findOne({
      where: { id: createRatingDto.testId },
    });
    if (!test) {
      throw new NotFoundException(
        `Test with ID ${createRatingDto.testId} not found`,
      );
    }

    const newRating = this.ratingRepository.create({
      user,
      test,
      rating: createRatingDto.rating,
      comment: createRatingDto.comment,
    });

    return this.ratingRepository.save(newRating);
  }
}
