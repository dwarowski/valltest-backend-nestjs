import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

import { extractTokenFromCookie } from 'src/shared/utils/functions/extract-token-from-cookie/token-extract';

import { TestsEntity } from '../../../entities/tests/test.entity';
import { GetTestAverageRatingService } from 'src/features/ratings/get-test-average-rating/get-test-average-rating.service';

@Injectable()
export class GetUsersTestsService {
  constructor(
    @Inject(GetTestAverageRatingService)
    private readonly getTestAverageRating: GetTestAverageRatingService,
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) { }

  async execute(req: Request): Promise<any> {
    const payload = await extractTokenFromCookie(req);
    const userId = payload.id;

    const userTests = await this.testsRepository
      .createQueryBuilder('userTests')
      .leftJoinAndSelect('userTests.testTag', 'testTag')
      .leftJoinAndSelect('testTag.tag', 'tags')
      .where('userTests.userAuthorId = :userId', { userId })
      .getMany();

    const userTestsCleaned = await Promise.all(
      userTests.map(async (test) => {
        const averageRating = await this.getTestAverageRating.execute(test.id)
        return { ...test, averageRating: averageRating };
      }),
    );
    return userTestsCleaned;
  }
}
