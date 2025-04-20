import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAnswerDto } from './create-answer.dto';
import { AnswersEntity } from '../../../entities/answers/answers.entity';

@Injectable()
export class CreateAnswerService {
  constructor(
    @InjectRepository(AnswersEntity)
    private readonly answersRepository: Repository<AnswersEntity>,
  ) {}

  async execute(dto: CreateAnswerDto) {
    const answerEntity = await this.answersRepository.save(dto);


    return { value: answerEntity.value, is_correct: answerEntity.is_correct }
  }
}
