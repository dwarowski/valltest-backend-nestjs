import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProblemDto } from './create-problem.dto';
import { ProblemsEntity } from '../../../entities/problems/problems.entity';
import { CreateAnswerService } from 'src/features/answers/create-answer/create-answers.service';
import { GetTestsIdService } from 'src/features/tests/get-test-id/get-tests-id.service';

@Injectable()
export class CreateProblemService {
  constructor(
    @Inject(CreateAnswerService)
    private readonly createAnswer: CreateAnswerService,
    @Inject(GetTestsIdService)
    private readonly getTest: GetTestsIdService,
    @InjectRepository(ProblemsEntity)
    private readonly problemsRepository: Repository<ProblemsEntity>,
  ) {}

  async execute(dto: CreateProblemDto): Promise<void> {
    const { testId, question, answers } = dto;
    const testEntity = await this.getTest.execute(testId);

    const hasCorrectAnswer = answers.some(
      (answer) => answer.is_correct === true,
    );

    if (!hasCorrectAnswer) {
      throw new BadRequestException('At least one answer must be correct.');
    }

    try {
      const problemEntity = await this.problemsRepository.save({
        test: testEntity,
        question,
      });

      await Promise.all(
        answers.map(async (answer) => {
          answer.problemId = problemEntity.id;
          await this.createAnswer.execute(answer);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
