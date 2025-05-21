import { Inject, Injectable } from '@nestjs/common';
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
    const testEntity = await this.getTest.execute(dto.testId, 'entity');

    try {
      const problemEntity = await this.problemsRepository.save({
        test: testEntity,
        ...dto,
      });

      await Promise.all(
        problemEntity.answers.map(async (answer) => {
          answer.problemId = problemEntity.id;
          await this.createAnswer.execute(answer);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
