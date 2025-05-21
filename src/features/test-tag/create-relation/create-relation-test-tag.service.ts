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
    private readonly testTagRepository: Repository<TestTagEntity>,
  ) {}

  async execute(test: TestsEntity, tag: TagsEntity) {
    return await this.testTagRepository.save({
      test,
      tag,
    });
  }
}
