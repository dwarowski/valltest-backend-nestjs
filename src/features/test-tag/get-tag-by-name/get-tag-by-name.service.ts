import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestTagEntity } from '../../../entities/test-tag/test-tag.entity';

@Injectable()
export class GetTagByNameService {
  constructor(
    @InjectRepository(TestTagEntity)
    private repository: Repository<TestTagEntity>,
  ) {}

  async getTagByName(tagName: string) {
    return await this.repository
      .createQueryBuilder('tags')
      .leftJoinAndSelect('tags.tag', 'tag')
      .where('tag.tag = :tagName', { tagName })
      .getOne();
  }
}
