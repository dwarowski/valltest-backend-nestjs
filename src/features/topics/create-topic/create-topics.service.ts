import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubjectEntity } from '../../../entities/subjects/subject.entity';

import { CreateTopicDto } from './create-topic.dto';
import { TopicEntity } from '../../../entities/topics/topic.entity';

@Injectable()
export class CreateTopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  // Создание темы
  async create(createTopicDto: CreateTopicDto): Promise<TopicEntity> {
    const subject = await this.subjectRepository.findOne({
      where: { id: createTopicDto.subjectId },
    });
    if (!subject) {
      throw new NotFoundException(
        `Subject with ID ${createTopicDto.subjectId} not found`,
      );
    }

    const topic = this.topicRepository.create({
      topicName: createTopicDto.topicName,
      subject,
    });

    return this.topicRepository.save(topic);
  }
}
