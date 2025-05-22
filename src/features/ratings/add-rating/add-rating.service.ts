import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './create-rating.dto';
import { RatingEntity } from '../../../entities/ratings/rating.entity';
import { Request } from 'express';
import { extractToken } from 'src/shared/utils/functions/extract-token/token-extract';
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
  async execute(createRatingDto: CreateRatingDto, req: Request): Promise<void> {
    const payload = await extractToken(req);
    const userId = payload.id;

    const user = await this.getUser.execute(userId, 'id');
    const test = await this.getTests.execute(createRatingDto.testId);

    await this.ratingRepository.save({
      user,
      test,
      rating: createRatingDto.rating,
      comment: createRatingDto.comment,
    });
  }
}
