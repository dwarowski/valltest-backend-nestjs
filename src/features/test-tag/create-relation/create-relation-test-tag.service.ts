import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TagsEntity } from 'src/entities/tags/tags.entity';
import { TestsEntity } from 'src/entities/tests/test.entity';

import { TestTagEntity } from '../../../entities/test-tag/test-tag.entity';

@Injectable()
export class CreateRelationTestTagService {
  constructor(
    @InjectRepository(TestTagEntity)
    private readonly repository: Repository<TestTagEntity>,
  ) {}

  async createRelationTestTag(test: TestsEntity, tag: TagsEntity) {
    return await this.repository.save({
      test: test,
      tag: tag,
    });
  }
}
