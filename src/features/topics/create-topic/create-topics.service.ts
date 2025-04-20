import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
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
    private readonly getSubject: GetSubjectService,
  ) {}

  // Создание темы
  async execute(createTopicDto: CreateTopicDto) {
    const subject = await this.getSubject.execute(createTopicDto.subjectName);
    const topicEntity = await this.topicRepository.findOneBy({ topicName: createTopicDto.topicName });
    if (topicEntity) {
      throw new ForbiddenException('Topic already exsist');
    }
    return await this.topicRepository.save({
      topicName: createTopicDto.topicName,
      subject,
    });
  }
}
