import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTopicDto } from './create-topic.dto';
import { TopicEntity } from '../../../entities/topics/topic.entity';
import { GetSubjectService } from 'src/features/subjects/get-subject/get-subject.service';
import { GetTopicService } from '../get-topic/get-topics.service';

@Injectable()
export class CreateTopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
    @Inject(GetSubjectService)
    private readonly getSubjectService: GetSubjectService,
    @Inject(GetTopicService)
    private readonly getTopicService: GetTopicService,
  ) {}

  // Создание темы
  async create(createTopicDto: CreateTopicDto) {
    const subject = await this.getSubjectService.execute(
      createTopicDto.subjectName,
    );
    const topicEntity = await this.getTopicService.getTopicByName(
      createTopicDto.topicName,
    );
    if (topicEntity) {
      throw new ForbiddenException('Topic already exsist');
    }

    const topic = await this.topicRepository.save({
      topicName: createTopicDto.topicName,
      subject,
    });

    return topic;
  }
}
