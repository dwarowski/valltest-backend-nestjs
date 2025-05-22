import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from '../../../entities/tests/test.entity';
import { TestWithProblemsAndAnswers } from './test-with-problems-and-answers.dto';

@Injectable()
export class GetTestsIdService {
  constructor(
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) {}

  async execute(id: number): Promise<TestWithProblemsAndAnswers> {
    const testEntity = await this.testsRepository
      .createQueryBuilder('test')
      .where({ id: id })
      .leftJoinAndSelect('test.problems', 'problems')
      .leftJoinAndSelect('problems.answers', 'answers')
      .getOne();

    if (!testEntity) {
      throw new NotFoundException('Test doesn`t exsit');
    }

    // Преобразуем testEntity в нужный формат
    const result: TestWithProblemsAndAnswers = {
      id: testEntity.id,
      testName: testEntity.testName,
      difficulty: testEntity.difficulty,
      timeForTest: testEntity.timeForTest,
      createdAt: testEntity.createdAt,
      problems:
        testEntity.problems?.map((problem) => ({
          id: problem.id,
          question: problem.question,
          answers:
            problem.answers?.map((answer) => ({
              id: answer.id,
              value: answer.value,
            })) || [],
        })) || [],
    };

    return result;
  }
}
