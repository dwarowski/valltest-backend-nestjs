import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TestCorrectAnswersDto } from './test-correct-answers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TestsEntity } from 'src/entities/tests/test.entity';
import { Repository } from 'typeorm';
import { CorrectAnswerDto } from './correct-answer.dto';

@Injectable()
export class GetTestCorrectAnswersService {
  constructor(
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) {}

  async execute(testId: number) {
    const testEntity = await this.testsRepository
      .createQueryBuilder('test')
      .where({ id: testId })
      .leftJoinAndSelect('test.problems', 'problems')
      .leftJoinAndSelect('problems.answers', 'answers')
      .addSelect('answers.is_correct')
      .getOne();

    if (!testEntity) {
      throw new NotFoundException(`Test with id: ${testId}`);
    }

    const { problems } = testEntity;
    if (!problems) {
      throw new InternalServerErrorException('Problems not loaded');
    }

    const correctAnswers: CorrectAnswerDto[] = problems.map((problem) => {
      const { answers } = problem;

      if (!answers) {
        throw new InternalServerErrorException('Answers not loaded');
      }

      const correctAnswerEntity = answers.find((answer) => answer.is_correct);

      if (!correctAnswerEntity) {
        throw new InternalServerErrorException(
          `No correct answer found for problem with ID: ${problem.id}`,
        );
      }

      return { problemId: problem.id, answerId: correctAnswerEntity.id };
    });

    const result: TestCorrectAnswersDto = {
      testId: testEntity.id,
      correctAnswers,
    };

    return result;
  }
}
