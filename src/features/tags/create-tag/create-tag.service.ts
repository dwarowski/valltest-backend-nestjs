import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestTagService } from 'src/features/test-tag/test-tag.service';
import { TestsService } from 'src/features/tests/tests.service';

import { CreateTagDto } from './create-tag.dto';
import { TagsEntity } from '../../../entities/tags/tags.entity';

@Injectable()
export class CreateTagService {
  constructor(
    @Inject(TestsService)
    private testsService: TestsService,
    @InjectRepository(TagsEntity)
    private repository: Repository<TagsEntity>,
    @Inject(TestTagService)
    private testTagService: TestTagService,
  ) {}

  async createTag(dto: CreateTagDto) {
    const { tag, testId } = dto;
    const test = await this.testsService.getTestEntityById(testId);

    const tags = await this.repository.save({
      tag,
    });
    return await this.testTagService.createRelationTestTag(test, tags);
  }
}
