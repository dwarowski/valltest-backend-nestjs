import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from '../../../entities/tests/test.entity';

@Injectable()
export class DeleteTestsService {
  constructor(
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) {}

  async execute(id: number) {
    return await this.testsRepository
      .createQueryBuilder('testDelete')
      .delete()
      .where({ id: id })
      .execute();
  }
}
