import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from '../../../entities/tests/test.entity';

@Injectable()
export class GetTestsIdService {
  constructor(
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) {}

  async execute(id: number): Promise<TestsEntity> {
    const testEntity = await this.testsRepository
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
