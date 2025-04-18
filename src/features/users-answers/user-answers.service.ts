import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { UserAnswersEntity } from '../../entities/user-answers/user-answer.entity';

@Injectable()
export class UserAnswersService {
  constructor(
    @InjectRepository(UserAnswersEntity)
    private repository: Repository<UserAnswersEntity>,
  ) {}

  getUserAnswersByUser(id: number) {
    return this.repository.findBy({ id });
  }

  createUserAnswer(dto: CreateUserAnswerDto) {
    return this.repository.save(dto);
  }
}
