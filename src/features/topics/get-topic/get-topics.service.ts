import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TopicEntity } from '../../../entities/topics/topic.entity';

@Injectable()
export class GetTopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
  ) {}

  async execute(name: string) {
    const topicEntity = await this.topicRepository
      .createQueryBuilder('topic')
      .where({ topicName: name })
      .getOne();
    if (!topicEntity) {
      throw new NotFoundException(`Topic with name ${name} not found`);
    }
    return topicEntity;
  }
}
