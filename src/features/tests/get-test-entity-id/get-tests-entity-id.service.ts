import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from '../../../entities/tests/test.entity';

@Injectable()
export class GetTestsEntityByIdService {
  constructor(
    @InjectRepository(TestsEntity)
    private readonly repository: Repository<TestsEntity>,
  ) {}

  async getTestEntityById(id: number) {
    const testEntity = await this.repository
      .createQueryBuilder('test')
      .where({ id: id })
      .leftJoinAndSelect('test.problems', 'problems')
      .leftJoinAndSelect('problems.answers', 'answers')
      .getOne();

    if (!testEntity) {
      throw new NotFoundException('Test doesn`t exsit');
    }
    return testEntity;
  }
}
