import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TopicService } from './topics.service';
import { TopicEntity } from './entity/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  // Получить все темы по ID предмета
  @Get('/subject/:subjectId')
  async findAllBySubject(
    @Param('subjectId') subjectId: number,
  ): Promise<TopicEntity[]> {
    return this.topicService.findAllBySubject(subjectId);
  }

  // Создание темы
  @Post()
  async create(@Body() createTopicDto: CreateTopicDto): Promise<TopicEntity> {
    return this.topicService.create(createTopicDto);
  }

  // Обновление темы
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTopicDto: UpdateTopicDto,
  ): Promise<TopicEntity> {
    return this.topicService.update(id, updateTopicDto);
  }

  // Удалить тему
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.topicService.delete(id);
  }
}
