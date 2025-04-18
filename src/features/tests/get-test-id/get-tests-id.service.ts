import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from '../../../entities/tests/test.entity';
import { TestTagEntity } from 'src/entities/test-tag/test-tag.entity';

@Injectable()
export class GetTestsIdService {
  constructor(
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
}
