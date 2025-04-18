import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTopicDto } from './create-topic.dto';
import { TopicEntity } from '../../../entities/topics/topic.entity';
import { GetSubjectService } from 'src/features/subjects/get-subject/get-subject.service';

@Injectable()
export class CreateTopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
    @Inject(GetSubjectService)
    private readonly getSubjectService: GetSubjectService,
  ) {}

  // Создание темы
  async create(createTopicDto: CreateTopicDto): Promise<TopicEntity> {
    const subject = await this.getSubjectService.execute(createTopicDto.subjectName)

    const topic = this.topicRepository.create({
      topicName: createTopicDto.topicName,
      subject,
    });

    return this.topicRepository.save(topic);
  }
}
