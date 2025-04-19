import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageMetaDto } from '../../../shared/utils/dto/get-page/page-meta.dto';
import { PageDto } from '../../../shared/utils/dto/get-page/page.dto';

import { TestFilterDto } from './test-filter.dto';
import { TestsEntity } from '../../../entities/tests/test.entity';
import { TestsWithRatingDto } from '../get-test-user/test-with-rating.dto';
import { TestTagEntity } from 'src/entities/test-tag/test-tag.entity';
import { GetTestsDto } from './get-tests.dto';
import { GetTestAverageRatingService } from '../../ratings/get-test-average-rating/get-test-average-rating.service';

@Injectable()
export class GetTestsPageService {
  constructor(
    @Inject(GetTestAverageRatingService)
    private readonly getTestAverageRatingService: GetTestAverageRatingService,
    @InjectRepository(TestsEntity)
    private readonly repository: Repository<TestsEntity>,
  ) {}

  async getTestsByPage(
    page: number,
    take: number,
    filterDto?: TestFilterDto,
  ): Promise<PageDto<GetTestsDto>> {
    if (isNaN(page) || isNaN(take) || take > 60 || page < 0) {
      throw new BadRequestException('Invalid pagination params');
    }

    const testsQuery = this.repository
      .createQueryBuilder('tests')
      .skip((page - 1) * take)
      .take(take)
      .leftJoinAndSelect('tests.topic', 'topic')
      .leftJoinAndSelect('topic.subject', 'subject')
      .leftJoinAndSelect('tests.testTag', 'testTag')
      .leftJoinAndSelect('testTag.tag', 'tags');

    if (filterDto) {
      this.applyFilters(testsQuery, filterDto);
    }

    const [tests, total] = await testsQuery.getManyAndCount();

    const testsWithRating = await this.addAverageRatingToTests(tests);

    const testsCleaned = await Promise.all(
      testsWithRating.map(async (test) => {
        const {
          topic,
          testTag,
          timeForTest: _timeForTest,
          ...testCleaned
        } = test;
        const cleanedTestTags = await this.cleanTags(testTag);
        return {
          ...testCleaned,
          tags: cleanedTestTags,
          topicName: topic.topicName,
          subjectName: topic.subject.subjectName,
        };
      }),
    );

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: { page, take },
      itemCount: total,
    });

    const pageDto = new PageDto(testsCleaned, pageMetaDto);

    return pageDto;
  }

  private async addAverageRatingToTests(
    tests: TestsEntity[],
  ): Promise<TestsWithRatingDto[]> {
    return Promise.all(
      tests.map(async (test) => {
        const averageRating =
          await this.getTestAverageRatingService.getAverageRating(test.id);
        return { ...test, averageRating: averageRating };
      }),
    );
  }

  private async applyFilters(
    queryBuilder,
    filterDto: TestFilterDto,
  ): Promise<void> {
    const { subject, topic, tag } = filterDto;

    if (subject) {
      queryBuilder.andWhere('subject.subjectName = :subject', { subject });
    }

    if (topic) {
      queryBuilder.andWhere('topic.topicName = :topic', { topic });
    }

    if (tag) {
      queryBuilder.andWhere('tags.tag = :tag', { tag });
    }
  }

  private async cleanTags(testTag: TestTagEntity[]): Promise<string[]> {
    const cleanTags = testTag.map((tagEntry) => {
      return tagEntry.tag.tag;
    });
    return cleanTags;
  }
}
