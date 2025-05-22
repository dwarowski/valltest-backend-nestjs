import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageMetaDto } from '../../../shared/utils/dto/get-page/page-meta.dto';
import { PageDto } from '../../../shared/utils/dto/get-page/page.dto';

import { PageTestDto } from './page-test.dto';
import { TestsEntity } from '../../../entities/tests/test.entity';
import { GetTestsAverageRatingService } from 'src/features/ratings/get-tests-average-rating/get-tests-average-rating.service';
import { TestWithRatingDto } from 'src/shared/utils/dto/test-with-rating/test-with-rating.dto';

@Injectable()
export class GetTestsPageService {
  constructor(
    @Inject(GetTestsAverageRatingService)
    private readonly getTestAverageRating: GetTestsAverageRatingService,
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) {}

  async execute(dto: PageTestDto): Promise<PageDto<TestWithRatingDto>> {
    const { page, take, subject, tag, topic } = dto;

    const testsQuery = this.testsRepository
      .createQueryBuilder('tests')
      .skip((page - 1) * take)
      .take(take)
      .leftJoinAndSelect('tests.topic', 'topic')
      .leftJoinAndSelect('topic.subject', 'subject')
      .leftJoinAndSelect('tests.testTag', 'testTag')
      .leftJoinAndSelect('testTag.tag', 'tags');

    if (subject) {
      testsQuery.andWhere('subject.subjectName = :subject', { subject });
    }

    if (topic) {
      testsQuery.andWhere('topic.topicName = :topic', { topic });
    }

    if (tag) {
      testsQuery.andWhere('tags.tag = :tag', { tag });
    }

    const [tests, total] = await testsQuery.getManyAndCount();

    // Собираем все id тестов
    const testIds = tests.map((test) => test.id);

    // Получаем все рейтинги для этих тестов за один запрос
    const ratingsMap = await this.getTestAverageRating.execute(testIds);

    // Добавляем к тестам рейтинги
    const testsWithRatings: TestWithRatingDto[] = tests.map((test) => ({
      ...test,
      averageRating: ratingsMap[test.id],
    }));

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: { page, take },
      itemCount: total,
    });

    const pageDto = new PageDto(testsWithRatings, pageMetaDto);

    return pageDto;
  }
}
