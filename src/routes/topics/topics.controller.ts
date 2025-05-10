import { Controller, Post, Body, Delete } from '@nestjs/common';

import { CreateTopicDto } from '../../features/topics/create-topic/create-topic.dto';
import { CreateTopicService } from 'src/features/topics/create-topic/create-topics.service';
import { DeleteTopicService } from 'src/features/topics/delete-topic/delete-topics.service';
import { DeleteTopicDto } from 'src/features/topics/delete-topic/delete-topic.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('topics')
export class TopicController {
  constructor(
    private readonly createTopicService: CreateTopicService,
    private readonly deleteTopicService: DeleteTopicService,
  ) {}

  // Создание темы
  @Post()
  @ApiOperation({
    summary: 'Topic creation',
    description: 'Topic creation using topic name and subject name',
  })
  async create(@Body() createTopicDto: CreateTopicDto): Promise<void> {
    return this.createTopicService.execute(createTopicDto);
  }

  // Удалить тему
  @Delete()
  @ApiOperation({
    summary: 'Topic remove',
    description: 'Topic remove using topic name',
  })
  async delete(@Body() deleteTopicDto: DeleteTopicDto): Promise<void> {
    return await this.deleteTopicService.execute(deleteTopicDto);
  }
}
