import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TagsEntity } from '../../../entities/tags/tags.entity';

@Injectable()
export class DeleteTagService {
  constructor(
    @InjectRepository(TagsEntity)
    private readonly repository: Repository<TagsEntity>,
  ) {}

  async deleteTagByName(tagName: string) {
    return await this.repository
      .createQueryBuilder('deleteTag')
      .delete()
      .where({ tag: tagName })
      .execute();
  }
}
