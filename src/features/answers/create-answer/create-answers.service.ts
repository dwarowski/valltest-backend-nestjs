import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAnswerDto } from './create-answer.dto';
import { AnswersEntity } from '../../../entities/answers/answers.entity';

@Injectable()
export class CreateAnswersService {
  constructor(
    @InjectRepository(AnswersEntity)
    private repository: Repository<AnswersEntity>,
  ) { }

  createAnswer(id: number, dto: CreateAnswerDto) {
    return this.repository.save({ ...dto, problem: id });
  }
}
