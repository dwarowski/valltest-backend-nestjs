import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserAnswersEntity } from './entity/user-answer.entity';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';

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
