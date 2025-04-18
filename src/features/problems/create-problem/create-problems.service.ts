import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProblemDto } from './create-problem.dto';
import { ProblemsEntity } from '../../../entities/problems/problems.entity';

@Injectable()
export class CreateProblemsService {
  constructor(
    @InjectRepository(ProblemsEntity)
    private readonly repository: Repository<ProblemsEntity>,
  ) { }
  async createProblem(id: number, dto: CreateProblemDto) {
    return await this.repository.save({ ...dto, test: id });
  }
}
