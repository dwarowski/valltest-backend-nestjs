import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TopicEntity } from './entity/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { SubjectsService } from 'src/subjects/subjects.service';

@Injectable()
export class TopicsService {
    constructor(
        @Inject(SubjectsService)
        private subjectService: SubjectsService,
        @InjectRepository(TopicEntity)
        private repository: Repository<TopicEntity>,
    ) { }

    getTopic() {
        return this.repository.find();
    }

    async getTopicById(id: number) {
        return await this.repository.createQueryBuilder('topic')
            .where({ id: id })
            .getOne()
    }

    async createTopic(dto: CreateTopicDto) {
        const { topicName, subjectId } = dto;
        const subject = await this.subjectService.getSubjectById(subjectId)
        if (!subject) {
            throw new BadRequestException(`Subject with ID ${subjectId} not found`)
        }

        return await this.repository.save(
            {
                topicName,
                subject: subject
            }
        )
    }

}
