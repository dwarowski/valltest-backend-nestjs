import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TopicEntity } from '../../../entities/topics/topic.entity';

@Injectable()
export class GetTopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
  ) {}

  async getTopicByName(name: string) {
    return await this.topicRepository
      .createQueryBuilder('topic')
      .where({ topicName: name })
      .getOne();
  }
}
