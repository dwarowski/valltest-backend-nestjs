import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

import { extractTokenFromCookie } from 'src/cookie-token/token-extract';
import { RatingService } from 'src/ratings/rating.service';
import { TestTagService } from 'src/test-tag/test-tag.service';
import { TopicService } from 'src/topics/topics.service';

import { PageMetaDto } from '../global-dto/get-page/page-meta.dto';
import { PageDto } from '../global-dto/get-page/page.dto';

import { CreateTestDto } from './dto/create-test.dto';
import { TestFilterDto } from './dto/test-filter.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestsEntity } from './entity/test.entity';
import { UserTestsDto } from './dto/get-user-tests.dto';
import { TestsWithRatingDto } from './dto/test-with-rating.dto';

@Injectable()
export class TestsService {
  constructor(
    @Inject(RatingService)
    private readonly ratingService: RatingService,
    @Inject(TopicService)
    private readonly topicService: TopicService,
    @Inject(TestTagService)
    private readonly testTagService: TestTagService,
    @InjectRepository(TestsEntity)
    private repository: Repository<TestsEntity>,
  ) { }

  async getTestById(id: number) {
    return await this.repository
      .createQueryBuilder('test')
      .where({ id: id })
      .getOne();
  }

  async getTestByUser(req: Request): Promise<UserTestsDto[]> {
    const payload = await extractTokenFromCookie(req);
    const userId = payload.id;

    const userTests = await this.repository
      .createQueryBuilder('userTests')
      .leftJoinAndSelect('userTests.testTag', 'testTag')
      .leftJoinAndSelect('testTag.tag', 'tags')
      .where('userTests.userAuthorId = :userId', { userId })
      .getMany();

    const userTestsWithRaiting = await this.addAverageRatingToTests(userTests)

    const userTestsCleaned: UserTestsDto[] = userTestsWithRaiting.map(test => {
      const { ratings, testTag, topic, timeForTest, userAuthorId, ...testCleaned } = test;

      const cleanedTestTags = testTag.map(tagEntry => {
        return tagEntry.tag.tag
      })
      return { ...testCleaned, tags: cleanedTestTags };
    })
    return userTestsCleaned
  }

  async getTestsByPage(
    page: number,
    take: number,
    filterDto?: TestFilterDto,
  ): Promise<PageDto<TestsWithRatingDto>> {
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

    const testsWithRating = this.addAverageRatingToTests(tests);

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: { page, take },
      itemCount: total,
    });

    const pageDto = new PageDto(await testsWithRating, pageMetaDto);

    return pageDto;
  }

  async addAverageRatingToTests(tests: TestsEntity[]): Promise<TestsWithRatingDto[]> {
    return Promise.all(
      tests.map(async (test) => {
        const averageRating = await this.ratingService.getAverageRating(
          test.id,
        );

        return {
          ...test,
          averageRating: averageRating,
        };
      }),
    );
  }

  async creatTest(dto: CreateTestDto) {
    const { testName, userAuthorId, difficulty, topicId, timeForTest } = dto;

    const topic = await this.topicService.getTopicById(topicId);

    if (!topic) {
      throw new Error(`Topic with ID ${topicId} not found`);
    }
    return await this.repository.save({
      testName,
      userAuthorId,
      difficulty,
      topic: topic,
      timeForTest,
    });
  }

  async deleteTest(id: number) {
    return await this.repository
      .createQueryBuilder('testDelete')
      .delete()
      .where({ id: id })
      .execute();
  }

  async updateTest(id: number, dto: UpdateTestDto) {
    try {
      const { testName, userAuthorId, difficulty, topicId, timeForTest } = dto;

      if (!topicId) {
        throw new BadRequestException('topicId is required');
      }

      const topic = await this.topicService.getTopicById(topicId);

      if (!topic) {
        throw new Error(`Topic with ID ${topicId} not found`);
      }

      const result = await this.repository
        .createQueryBuilder('testUpdate')
        .update(TestsEntity)
        .set({
          testName,
          userAuthorId,
          difficulty,
          topic: topic,
          timeForTest,
        })
        .where({ id: id })
        .execute();
      if (result.affected === 0) {
        throw new NotFoundException(`Запись с ID ${id} не найдена`);
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else if (error.code === '23503') {
        // Специфичная проверка кода ошибки
        throw new BadRequestException(
          `Нарушение ограничения внешнего ключа: ${error.detail}`,
        );
      } else {
        throw new InternalServerErrorException('Ошибка сервера');
      }
    }
  }

  async deleteTagByTestId(testId: number, tag: string) {
    const tagEntity = await this.testTagService.getTagByName(tag);

    if (!tagEntity) {
      throw new Error(`tag with name "${tag}" not found`);
    }

    const tagId = tagEntity.tag.id;

    return await this.testTagService.deleteRelationByTestAndTag(testId, tagId);
  }

  async addTagToTest(testId: number, tag: string) {
    const tagEntity = await this.testTagService.getTagByName(tag);
    const testEntity = await this.getTestById(testId);

    if (!tagEntity) {
      throw new BadRequestException('Not found');
    }

    if (!testEntity) {
      throw new BadRequestException('Not found');
    }
    return this.testTagService.createRelationTestTag(testEntity, tagEntity.tag);
  }

  private applyFilters(queryBuilder, filterDto: TestFilterDto): void {
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
}
