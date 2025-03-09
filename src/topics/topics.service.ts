import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TopicEntity } from './entity/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicsService {
    constructor(
        @InjectRepository(TopicEntity)
        private repository: Repository<TopicEntity>,
      ) {}

    getTopic(){
        return this.repository.find();  
    }

    async getTopicById(id: number){
        return await this.repository.createQueryBuilder('topic')
        .where({id: id})
        .getOne()
    }

    createTopic(dto: CreateTopicDto){
        return this.repository.save(dto)
    }
    
}
