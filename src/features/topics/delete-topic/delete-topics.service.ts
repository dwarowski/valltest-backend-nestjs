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
  async delete(id: number): Promise<void> {
    const result = await this.topicRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
  }
}
