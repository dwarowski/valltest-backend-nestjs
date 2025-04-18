import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestTagEntity } from '../../../entities/test-tag/test-tag.entity';

@Injectable()
export class DeleteRelationTestTagService {
  constructor(
    @InjectRepository(TestTagEntity)
    private repository: Repository<TestTagEntity>,
  ) {}

  async deleteRelationByTestAndTag(testId: number, tagId: number) {
    return this.repository
      .createQueryBuilder()
      .delete()
      .where({ test: testId })
      .andWhere({ tag: tagId })
      .execute();
  }
}
