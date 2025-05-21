import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAnswerDto } from './create-answer.dto';
import { AnswersEntity } from '../../../entities/answers/answers.entity';
import { GetProblemService } from 'src/features/problems/get-problem/get-problem.service';

@Injectable()
export class CreateAnswerService {
  constructor(
    @InjectRepository(AnswersEntity)
    private readonly answersRepository: Repository<AnswersEntity>,
    @Inject(GetProblemService)
    private readonly getProblem: GetProblemService,
  ) {}

  async execute(dto: CreateAnswerDto): Promise<void> {
    const problemEntity = await this.getProblem.execute(dto.problemId);

    try {
      await this.answersRepository.save({
        problem: problemEntity,
        ...dto,
      });
    } catch (error) {
      throw error;
    }
  }
}
