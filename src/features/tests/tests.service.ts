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

import { extractTokenFromCookie } from 'src/shared/utils/functions/extract-token-from-cookie/token-extract';
import { GetTagByNameService } from '../test-tag/get-tag-by-name/get-tag-by-name.service';
import { TopicService } from 'src/features/topics/topics.service';

import { PageMetaDto } from '../../shared/utils/dto/get-page/page-meta.dto';
import { PageDto } from '../../shared/utils/dto/get-page/page.dto';

import { CreateTestDto } from './dto/create-test.dto';
import { TestFilterDto } from './dto/test-filter.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestsEntity } from '../../entities/tests/test.entity';
import { UserTestsDto } from './dto/get-user-tests.dto';
import { TestsWithRatingDto } from './dto/test-with-rating.dto';
import { TestTagEntity } from 'src/entities/test-tag/test-tag.entity';
import { GetTestsDto } from './dto/get-tests.dto';
import { CreateProblemsService } from 'src/features/problems/create-problem/create-problems.service';
import { CreateAnswersService } from 'src/features/answers/create-answer/create-answers.service';
import { GetTestAverageRatingService } from '../ratings/get-test-average-rating/get-test-average-rating.service';
import { CreateRelationTestTagService } from '../test-tag/create-relation/create-relation-test-tag.service';
import { DeleteRelationTestTagService } from '../test-tag/delete-relation/delete-relation-test-tag.service';

@Injectable()
export class TestsService {
  constructor(
    @Inject(GetTestAverageRatingService)
    private readonly getTestAverageRatingService: GetTestAverageRatingService ,
    @Inject(TopicService)
    private readonly topicService: TopicService,
    @Inject(GetTagByNameService)
    private readonly getTagByNameService: GetTagByNameService,
    @Inject(CreateRelationTestTagService)
    private readonly createRelationTestTagService: CreateRelationTestTagService,
    @Inject(DeleteRelationTestTagService)
    private readonly deleteRelationTestTagService: DeleteRelationTestTagService,
    @Inject(CreateProblemsService)
    private readonly createProblemsService: CreateProblemsService,
    @Inject(CreateAnswersService)
    private readonly answersService: CreateAnswersService,
    @InjectRepository(TestsEntity)
    private repository: Repository<TestsEntity>,
  ) {}

  async getTestById(id: number) {
    const testEntity = await this.repository
      .createQueryBuilder('test')
      .where({ id: id })
      .leftJoinAndSelect('test.problems', 'problems')
      .leftJoinAndSelect('problems.answers', 'answers')
      .getOne();

    if (!testEntity) {
      throw new NotFoundException('Test doesn`t exsit');
    }

    const { problems, ratings, ...test } = testEntity;

    const cleanTest = await Promise.all(
      problems.map(async (question) => {
        const { test, id, answers, ...cleanProblem } = question;

        const cleanAnswers = await Promise.all(
          answers.map(async (answer) => {
            return answer.value;
          }),
        );

        return { ...cleanProblem, answers: cleanAnswers };
      }),
    );

    return { ...test, problems: cleanTest };
  }

  async getTestEntityById(id: number) {
    const testEntity = await this.repository
      .createQueryBuilder('test')
      .where({ id: id })
      .leftJoinAndSelect('test.problems', 'problems')
      .leftJoinAndSelect('problems.answers', 'answers')
      .getOne();

    if (!testEntity) {
      throw new NotFoundException('Test doesn`t exsit');
    }
    return testEntity;
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

    const userTestsWithRaiting = await this.addAverageRatingToTests(userTests);

    const userTestsCleaned: UserTestsDto[] = await Promise.all(
      userTestsWithRaiting.map(async (test) => {
        const {
          ratings,
          testTag,
          topic,
          timeForTest,
          userAuthorId,
          ...testCleaned
        } = test;
        const cleanedTestTags = await this.cleanTags(testTag);
        return { ...testCleaned, tags: cleanedTestTags };
      }),
    );
    return userTestsCleaned;
  }

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
        const { topic, testTag, timeForTest, ...testCleaned } = test;
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

  async creatTest(dto: CreateTestDto, req: Request) {
    const { testName, difficulty, topicName, questions } = dto;
    const payload = await extractTokenFromCookie(req);
    const userId = payload.id;

    const topicEntity = await this.topicService.getTopicByName(topicName);

    if (!topicEntity) {
      throw new Error(`Topic with name: ${topicName} not found`);
    }

    const testEntity = await this.repository.save({
      testName,
      userAuthorId: userId,
      difficulty,
      topic: topicEntity,
      timeForTest: 2,
    });

    const testQuestions = await Promise.all(
      questions.map(async (question) => {
        const createdProblem = await this.createProblemsService.createProblem(
          testEntity.id,
          question,
        );
        const { test, id, ...cleanProblem } = createdProblem;

        await Promise.all(
          question.answers.map(async (answer) => {
            const createdAnswer = await this.answersService.createAnswer(
              createdProblem.id,
              answer,
            );
            const { problem, id, ...cleanAnswer } = createdAnswer;
            return cleanAnswer;
          }),
        );

        return cleanProblem;
      }),
    );

    return { ...testEntity, problems: testQuestions };
  }

  async deleteTest(id: number) {
    return await this.repository
      .createQueryBuilder('testDelete')
      .delete()
      .where({ id: id })
      .execute();
  }

  async updateTest(id: number, dto: UpdateTestDto, req: Request) {
    const payload = await extractTokenFromCookie(req);
    const userId = payload.id;
    try {
      const { testName, difficulty, topicName } = dto;

      if (!topicName) {
        throw new BadRequestException('topic name is required');
      }

      const topic = await this.topicService.getTopicByName(topicName);

      if (!topic) {
        throw new Error(`Topic with name: ${topicName} not found`);
      }

      const result = await this.repository
        .createQueryBuilder('testUpdate')
        .update(TestsEntity)
        .set({
          testName,
          userAuthorId: userId,
          difficulty,
          topic: topic,
          timeForTest: 2,
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
    const tagEntity = await this.getTagByNameService.getTagByName(tag);

    if (!tagEntity) {
      throw new Error(`tag with name "${tag}" not found`);
    }

    const tagId = tagEntity.tag.id;

    return await this.deleteRelationTestTagService.deleteRelationByTestAndTag(testId, tagId);
  }

  async addTagToTest(testId: number, tag: string) {
    const tagEntity = await this.getTagByNameService.getTagByName(tag);
    const testEntity = await this.getTestEntityById(testId);

    if (!tagEntity) {
      throw new BadRequestException('Not found');
    }

    return this.createRelationTestTagService.createRelationTestTag(testEntity, tagEntity.tag);
  }

  private async addAverageRatingToTests(
    tests: TestsEntity[],
  ): Promise<TestsWithRatingDto[]> {
    return Promise.all(
      tests.map(async (test) => {
        const averageRating = await this.getTestAverageRatingService.getAverageRating(
          test.id,
        );
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
