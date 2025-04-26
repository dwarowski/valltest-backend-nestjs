import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TagsEntity } from '../../../entities/tags/tags.entity';
import { DeleteTagDto } from './delete-tag.dto';

@Injectable()
export class DeleteTagService {
  constructor(
    @InjectRepository(TagsEntity)
    private readonly tagsRepository: Repository<TagsEntity>,
  ) {}

  async execute(dto: DeleteTagDto) {
    return await this.tagsRepository
      .createQueryBuilder('deleteTag')
      .delete()
      .where({ tag: dto.tag })
      .execute();
  }
}
