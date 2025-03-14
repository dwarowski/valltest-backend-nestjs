import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicEntity } from './entity/topic.entity';
import { SubjectEntity } from '../subjects/entity/subject.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  // Получить все темы по ID предмета
  async findAllBySubject(subjectId: number): Promise<TopicEntity[]> {
    return this.topicRepository.find({ where: { subject: { id: subjectId } } });
  }

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

  // Обновление темы
  async update(id: number, updateTopicDto: UpdateTopicDto): Promise<TopicEntity> {
    const topic = await this.topicRepository.findOne({ where: { id } });
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    if (updateTopicDto.topicName) {
      topic.topicName = updateTopicDto.topicName;
    }

    if (updateTopicDto.subjectId) {
      const subject = await this.subjectRepository.findOne({
        where: { id: updateTopicDto.subjectId },
      });
      if (!subject) {
        throw new NotFoundException(
          `Subject with ID ${updateTopicDto.subjectId} not found`,
        );
      }
      topic.subject = subject;
    }

    return this.topicRepository.save(topic);
  }

  // Удалить тему
  async delete(id: number): Promise<void> {
    const result = await this.topicRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
  }
}
