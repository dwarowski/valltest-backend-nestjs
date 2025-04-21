import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

import { extractTokenFromCookie } from 'src/shared/utils/functions/extract-token-from-cookie/token-extract';

import { TestsEntity } from '../../../entities/tests/test.entity';
import { UserTestsDto } from './get-user-tests.dto';
import { TestsWithRatingDto } from './test-with-rating.dto';
import { TestTagEntity } from 'src/entities/test-tag/test-tag.entity';
import { GetTestAverageRatingService } from '../../ratings/get-test-average-rating/get-test-average-rating.service';

@Injectable()
export class GetUsersTestsService {
  constructor(
    @Inject(GetTestAverageRatingService)
    private readonly getTestAverageRating: GetTestAverageRatingService,
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) {}

  async getTestByUser(req: Request): Promise<UserTestsDto[]> {
    const payload = await extractTokenFromCookie(req);
    const userId = payload.id;

    const userTests = await this.testsRepository
      .createQueryBuilder('userTests')
      .leftJoinAndSelect('userTests.testTag', 'testTag')
      .leftJoinAndSelect('testTag.tag', 'tags')
      .where('userTests.userAuthorId = :userId', { userId })
      .getMany();

    const userTestsWithRaiting = await this.addAverageRatingToTests(userTests);

    const userTestsCleaned: UserTestsDto[] = await Promise.all(
      userTestsWithRaiting.map(async (test) => {
        const {
          ratings: _ratings,
          testTag,
          topic: _topic,
          timeForTest: _timeForTest,
          userAuthor: _userAuthorId,
          ...testCleaned
        } = test;
        const cleanedTestTags = await this.cleanTags(testTag);
        return { ...testCleaned, tags: cleanedTestTags };
      }),
    );
    return userTestsCleaned;
  }

  private async addAverageRatingToTests(
    tests: TestsEntity[],
  ): Promise<TestsWithRatingDto[]> {
    return Promise.all(
      tests.map(async (test) => {
        const averageRating = await this.getTestAverageRating.execute(test.id);
        return { ...test, averageRating: averageRating };
      }),
    );
  }

  private async cleanTags(testTag: TestTagEntity[]): Promise<string[]> {
    const cleanTags = testTag.map((tagEntry) => {
      return tagEntry.tag.tag;
    });
    return cleanTags;
  }
}
