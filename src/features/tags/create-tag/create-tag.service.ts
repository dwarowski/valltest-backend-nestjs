import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTagDto } from './create-tag.dto';
import { TagsEntity } from '../../../entities/tags/tags.entity';
import { CreateRelationTestTagService } from 'src/features/test-tag/create-relation/create-relation-test-tag.service';
import { GetTestsIdService } from 'src/features/tests/get-test-id/get-tests-id.service';

@Injectable()
export class CreateTagService {
  constructor(
    @Inject(GetTestsIdService)
    private readonly getTest: GetTestsIdService,
    @InjectRepository(TagsEntity)
    private readonly tagsRepository: Repository<TagsEntity>,
    @Inject(CreateRelationTestTagService)
    private readonly createRelationTestTag: CreateRelationTestTagService,
  ) {}

  async execute(dto: CreateTagDto) {
    const { tag, testId } = dto;
    const testEntity = await this.getTest.execute(testId, "entity");

    const tags = await this.tagsRepository.save({
      tag,
    });
    return await this.createRelationTestTag.execute(
      testEntity,
      tags,
    );
  }
}
