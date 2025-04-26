import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TopicEntity } from '../../../entities/topics/topic.entity';
import { GetTopicDto } from './get-topic.dto';

@Injectable()
export class GetTopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
  ) {}

  async execute(dto: GetTopicDto) {
    const topicEntity = await this.topicRepository
      .createQueryBuilder('topic')
      .where({ topicName: dto.topicName })
      .getOne();
    if (!topicEntity) {
      throw new NotFoundException(`Topic with name ${dto.topicName} not found`);
    }
    return topicEntity;
  }
}
