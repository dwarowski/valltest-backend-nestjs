import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

import { extractToken } from 'src/shared/utils/functions/extract-token/token-extract';

import { TestsEntity } from '../../../entities/tests/test.entity';
import { GetTestsAverageRatingService } from 'src/features/ratings/get-tests-average-rating/get-tests-average-rating.service';
import { TestWithRatingDto } from 'src/shared/utils/dto/test-with-rating/test-with-rating.dto';

@Injectable()
export class GetUsersTestsService {
  constructor(
    @Inject(GetTestsAverageRatingService)
    private readonly getTestsAverageRating: GetTestsAverageRatingService,
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) {}

  async execute(req: Request): Promise<TestWithRatingDto[]> {
    const payload = await extractToken(req);
    const userId = payload.id;

    const userTests = await this.testsRepository
      .createQueryBuilder('userTests')
      .leftJoinAndSelect('userTests.testTag', 'testTag')
      .leftJoinAndSelect('testTag.tag', 'tags')
      .where('userTests.userAuthorId = :userId', { userId })
      .getMany();

    // Collecting test Ids
    const testIds = userTests.map((test) => test.id);

    // Geting all ratings at once
    const ratingsMap = await this.getTestsAverageRating.execute(testIds);

    // Adding ratings to tests
    const userTestsWithRatings: TestWithRatingDto[] = userTests.map((test) => ({
      ...test,
      averageRating: ratingsMap[test.id],
    }));

    return userTestsWithRatings;
  }
}
