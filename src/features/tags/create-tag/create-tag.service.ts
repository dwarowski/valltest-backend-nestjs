import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTagDto } from './create-tag.dto';
import { TagsEntity } from '../../../entities/tags/tags.entity';

@Injectable()
export class CreateTagService {
  constructor(
    @InjectRepository(TagsEntity)
    private readonly tagsRepository: Repository<TagsEntity>,
  ) {}

  async execute(dto: CreateTagDto): Promise<void> {
    try {
      await this.tagsRepository.save({ tag: dto.tag });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('tag with this name already exists.');
      } else {
        throw new InternalServerErrorException('Failed to create tag.');
      }
    }
  }
}
