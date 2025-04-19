import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from '../../../entities/tests/test.entity';

import { CreateRatingDto } from './create-rating.dto';
import { RatingEntity } from '../../../entities/ratings/rating.entity';
import { Request } from 'express';
import { extractTokenFromCookie } from 'src/shared/utils/functions/extract-token-from-cookie/token-extract';
import { GetUserService } from 'src/features/users/get-user/get-user.service';
import { GetTestsEntityByIdService } from 'src/features/tests/get-test-entity-id/get-tests-entity-id.service';
 
@Injectable()
export class AddRatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @Inject(GetUserService)
    private readonly getUserService: GetUserService,
    @Inject(GetTestsEntityByIdService)
    private readonly getTestsEntityByIdService: GetTestsEntityByIdService,
  ) {}

  // Добавить оценку к тесту
  async addRating(createRatingDto: CreateRatingDto, req: Request) {
    const payload = await extractTokenFromCookie(req)
    const userId = payload.id
    
    const userEntity = await this.getUserService.execute(userId)

    const testEntity = await this.getTestsEntityByIdService.getTestEntityById(createRatingDto.testId)

    const newRating = await this.ratingRepository.save({
      user: userEntity,
      test: testEntity,
      rating: createRatingDto.rating,
      comment: createRatingDto.comment,
    });

    const {test, user, ...cleanedRating } = newRating
    
    return {...cleanedRating, user: user.username} ;
  }
}
