import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTagDto } from './create-tag.dto';
import { TagsEntity } from '../../../entities/tags/tags.entity';
import { CreateRelationTestTagService } from 'src/features/test-tag/create-relation/create-relation-test-tag.service';
import { GetTestsEntityByIdService } from 'src/features/tests/get-test-entity-id/get-tests-entity-id.service';

@Injectable()
export class CreateTagService {
  constructor(
    @Inject(GetTestsEntityByIdService)
    private readonly getTestsEntityByIdService: GetTestsEntityByIdService,
    @InjectRepository(TagsEntity)
    private readonly repository: Repository<TagsEntity>,
    @Inject(CreateRelationTestTagService)
    private readonly createRelationTestTagService: CreateRelationTestTagService,
  ) {}

  async createTag(dto: CreateTagDto) {
    const { tag, testId } = dto;
    const test = await this.getTestsEntityByIdService.getTestEntityById(testId);

    const tags = await this.repository.save({
      tag,
    });
    return await this.createRelationTestTagService.createRelationTestTag(test, tags);
  }
}
