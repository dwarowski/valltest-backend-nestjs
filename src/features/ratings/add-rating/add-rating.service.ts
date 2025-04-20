import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './create-rating.dto';
import { RatingEntity } from '../../../entities/ratings/rating.entity';
import { Request } from 'express';
import { extractTokenFromCookie } from 'src/shared/utils/functions/extract-token-from-cookie/token-extract';
import { GetUserService } from 'src/features/users/get-user/get-user.service';
import { GetTestsIdService } from 'src/features/tests/get-test-id/get-tests-id.service';

@Injectable()
export class AddRatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @Inject(GetUserService)
    private readonly getUser: GetUserService,
    @Inject(GetTestsIdService)
    private readonly getTests: GetTestsIdService,
  ) {}

  // Добавить оценку к тесту
  async execute(createRatingDto: CreateRatingDto, req: Request) {
    const payload = await extractTokenFromCookie(req);
    const userId = payload.id;

    const userEntity = await this.getUser.execute(userId, 'id');
    const testEntity = await this.getTests.execute(
      createRatingDto.testId,
      'entity',
    );

    const newRating = await this.ratingRepository.save({
      user: userEntity,
      test: testEntity,
      rating: createRatingDto.rating,
      comment: createRatingDto.comment,
    });

    const { test: _test, user, ...cleanedRating } = newRating;

    return { ...cleanedRating, user: user.username };
  }
}
