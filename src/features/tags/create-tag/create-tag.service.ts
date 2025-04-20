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
    private readonly getTestById: GetTestsIdService,
    @InjectRepository(TagsEntity)
    private readonly repository: Repository<TagsEntity>,
    @Inject(CreateRelationTestTagService)
    private readonly createRelationTestTagService: CreateRelationTestTagService,
  ) {}

  async createTag(dto: CreateTagDto) {
    const { tag, testId } = dto;
    const testEntity = await this.getTestById.execute(testId, "entity");

    const tags = await this.repository.save({
      tag,
    });
    return await this.createRelationTestTagService.createRelationTestTag(
      testEntity,
      tags,
    );
  }
}
