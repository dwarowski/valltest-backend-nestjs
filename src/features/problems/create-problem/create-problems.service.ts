import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProblemDto } from './create-problem.dto';
import { ProblemsEntity } from '../../../entities/problems/problems.entity';
import { CreateAnswerService } from 'src/features/answers/create-answer/create-answers.service';

@Injectable()
export class CreateProblemService {
  constructor(
    @Inject(CreateAnswerService)
    private readonly createAnswer: CreateAnswerService,
    @InjectRepository(ProblemsEntity)
    private readonly repository: Repository<ProblemsEntity>,
  ) {}

  async execute(dto: CreateProblemDto) {
    const problemEntity = await this.repository.save(dto);

    const answerEntities = await Promise.all(
      problemEntity.answers.map(async (answer) => {
        answer.problem = problemEntity.id
        const createdAnswer = await this.createAnswer.execute(answer);
        return createdAnswer;
      }),
    );
    return { question: problemEntity.question, answers: answerEntities }
  }
}
