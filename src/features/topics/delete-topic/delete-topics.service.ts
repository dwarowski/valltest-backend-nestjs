import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TopicEntity } from '../../../entities/topics/topic.entity';
import { DeleteTopicDto } from './delete-topic.dto';

@Injectable()
export class DeleteTopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
  ) {}

  // Удалить тему
  async execute(dto: DeleteTopicDto): Promise<void> {
    const result = await this.topicRepository
      .createQueryBuilder()
      .delete()
      .where({ topicName: dto.topicName })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Topic with ID ${dto.topicName} not found`);
    }
  }
}
