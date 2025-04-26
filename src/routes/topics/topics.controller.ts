import { Controller, Post, Body, Param, Delete } from '@nestjs/common';

import { CreateTopicDto } from '../../features/topics/create-topic/create-topic.dto';
import { TopicEntity } from '../../entities/topics/topic.entity';
import { CreateTopicService } from 'src/features/topics/create-topic/create-topics.service';
import { DeleteTopicService } from 'src/features/topics/delete-topic/delete-topics.service';

@Controller('topics')
export class TopicController {
  constructor(
    private readonly createTopicService: CreateTopicService,
    private readonly deleteTopicService: DeleteTopicService,
  ) {}

  // Создание темы
  @Post()
  async create(@Body() createTopicDto: CreateTopicDto): Promise<TopicEntity> {
    return this.createTopicService.execute(createTopicDto);
  }

  // Удалить тему
  @Delete(':topic')
  async delete(@Param('topic') topicName: string): Promise<string> {
    return await this.deleteTopicService.execute({ topicName });
  }
}
