import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from '../../../entities/tests/test.entity';

@Injectable()
export class DeleteTestsService {
  constructor(
    @InjectRepository(TestsEntity)
    private readonly repository: Repository<TestsEntity>,
  ) {}

  async deleteTest(id: number) {
    return await this.repository
      .createQueryBuilder('testDelete')
      .delete()
      .where({ id: id })
      .execute();
  }
}
