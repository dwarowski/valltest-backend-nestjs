import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestTagEntity } from './entity/test-tag.entity';
import { Repository } from 'typeorm';
import { TestsEntity } from 'src/tests/entity/test.entity';
import { TagsEntity } from 'src/tags/entity/tags.entity';

@Injectable()
export class TestTagService {
  constructor(
    @InjectRepository(TestTagEntity)
    private repository: Repository<TestTagEntity>,
  ) {}

  async createRelationTestTag(test: TestsEntity, tag: TagsEntity) {
    return await this.repository.save({
      test: test,
      tag: tag,
    });
  }

  async deleteRelationByTestAndTag(testId: number, tagId: number) {
    return this.repository
      .createQueryBuilder()
      .delete()
      .where({ test: testId })
      .andWhere({ tag: tagId })
      .execute();
  }

  async getTagByName(tagName: string) {
    return await this.repository
      .createQueryBuilder('tags')
      .leftJoinAndSelect('tags.tag', 'tag')
      .where('tag.tag = :tagName', { tagName })
      .getOne();
  }
}
