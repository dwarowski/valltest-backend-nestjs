import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TopicEntity } from '../../../entities/topics/topic.entity';

@Injectable()
export class DeleteTopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
  ) {}

  // Удалить тему
  async delete(topicName: string): Promise<string> {
    const result = await this.topicRepository
      .createQueryBuilder()
      .delete()
      .where({ topicName: topicName })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Topic with ID ${topicName} not found`);
    }
    return `Topic with name: ${topicName} deleted`;
  }
}
