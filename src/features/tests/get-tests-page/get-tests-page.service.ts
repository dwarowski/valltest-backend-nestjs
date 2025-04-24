import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageMetaDto } from '../../../shared/utils/dto/get-page/page-meta.dto';
import { PageDto } from '../../../shared/utils/dto/get-page/page.dto';

import { PageTestDto } from './page-test.dto';
import { TestsEntity } from '../../../entities/tests/test.entity';
import { GetTestAverageRatingService } from 'src/features/ratings/get-test-average-rating/get-test-average-rating.service';

@Injectable()
export class GetTestsPageService {
  constructor(
    @Inject(GetTestAverageRatingService)
    private readonly getTestAverageRating: GetTestAverageRatingService,
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) {}

  async execute(dto: PageTestDto): Promise<PageDto<any>> {
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

    const testsWRating = await Promise.all(
      tests.map(async (test) => {
        const averageRating = await this.getTestAverageRating.execute(test.id);
        return { ...test, averageRating: averageRating };
      }),
    );

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: { page, take },
      itemCount: total,
    });

    const pageDto = new PageDto(testsWRating, pageMetaDto);

    return pageDto;
  }
}
