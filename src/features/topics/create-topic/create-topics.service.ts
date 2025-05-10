import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTopicDto } from './create-topic.dto';
import { TopicEntity } from '../../../entities/topics/topic.entity';
import { GetSubjectService } from 'src/features/subjects/get-subject/get-subject.service';
import { GetSubjectDto } from 'src/features/subjects/get-subject/get-subject.dto';

@Injectable()
export class CreateTopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
    @Inject(GetSubjectService)
    private readonly getSubject: GetSubjectService,
  ) {}

  // Создание темы
  async execute(createTopicDto: CreateTopicDto): Promise<void> {
    const subject: GetSubjectDto = {
      subjectName: createTopicDto.subjectName,
    };

    const subjectEntity = await this.getSubject.execute(subject);
    const topicEntity = await this.topicRepository.findOneBy({
      topicName: createTopicDto.topicName,
    });

    if (topicEntity) {
      throw new ForbiddenException('Topic already exsist');
    }
    try {
      await this.topicRepository.save({
        topicName: createTopicDto.topicName,
        subjectEntity,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Topic with this name already exists.');
      } else {
        throw new InternalServerErrorException('Failed to create topic.');
      }
    }
  }
}
