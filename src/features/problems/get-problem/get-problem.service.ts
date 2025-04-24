import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemsEntity } from 'src/entities/problems/problems.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetProblemService {
  constructor(
    @InjectRepository(ProblemsEntity)
    private readonly problemsRepository: Repository<ProblemsEntity>,
  ) {}

  async execute(problemId: number) {
    const problemEntity = await this.problemsRepository.findOneBy({
      id: problemId,
    });
    if (!problemEntity) {
      throw new NotFoundException(`problem with id: ${problemId} not found`);
    }
    return problemEntity;
  }
}
