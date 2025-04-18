import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestTagService } from 'src/test-tag/test-tag.service';
import { TestsService } from 'src/tests/tests.service';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagsEntity } from './entity/tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @Inject(TestsService)
    private testsService: TestsService,
    @InjectRepository(TagsEntity)
    private repository: Repository<TagsEntity>,
    @Inject(TestTagService)
    private testTagService: TestTagService,
  ) {}

  getTags() {
    return this.repository.find();
  }

  async getTagByName(name: string) {
    return await this.repository
      .createQueryBuilder('tag')
      .where({ tag: name })
      .getOne();
  }

  async createTag(dto: CreateTagDto) {
    const { tag, testId } = dto;
    const test = await this.testsService.getTestEntityById(testId);

    const tags = await this.repository.save({
      tag,
    });
    return await this.testTagService.createRelationTestTag(test, tags);
  }

  async deleteTagById(id: number) {
    return await this.repository
      .createQueryBuilder('deleteTag')
      .delete()
      .where({ id: id })
      .execute();
  }
}
