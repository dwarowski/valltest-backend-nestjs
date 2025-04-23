import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from '../../../entities/tests/test.entity';

@Injectable()
export class GetTestsIdService {
  constructor(
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) {}

  async execute(id: number, type: 'entity'): Promise<TestsEntity>;
  async execute(id: number, type: 'test');
  async execute(id: number, type: 'entity' | 'test') {
    const testEntity = await this.testsRepository
      .createQueryBuilder('test')
      .where({ id: id })
      .leftJoinAndSelect('test.problems', 'problems')
      .leftJoinAndSelect('problems.answers', 'answers')
      .getOne();

    if (!testEntity) {
      throw new NotFoundException('Test doesn`t exsit');
    }

    if (type === 'entity') {
      return testEntity;
    }
    const { problems, ratings: _ratings, ...test } = testEntity;

    const cleanTest = await Promise.all(
      problems.map(async (question) => {
        const { test: _test, answers, ...cleanProblem } = question;

        const cleanAnswers = answers.map(({ id, value }) => ({ id, value }));

        return { ...cleanProblem, answers: cleanAnswers };
      }),
    );

    return { ...test, problems: cleanTest };
  }
}
