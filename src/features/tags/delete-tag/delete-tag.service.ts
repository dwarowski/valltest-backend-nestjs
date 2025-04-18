import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestTagService } from 'src/features/test-tag/test-tag.service';
import { TestsService } from 'src/features/tests/tests.service';

import { TagsEntity } from '../../../entities/tags/tags.entity';

@Injectable()
export class DeleteTagService {
  constructor(
    @Inject(TestsService)
    private testsService: TestsService,
    @InjectRepository(TagsEntity)
    private repository: Repository<TagsEntity>,
    @Inject(TestTagService)
    private testTagService: TestTagService,
  ) {}

  async deleteTagByName(tagName: string) {
    return await this.repository
      .createQueryBuilder('deleteTag')
      .delete()
      .where({ tag: tagName })
      .execute();
  }
}
