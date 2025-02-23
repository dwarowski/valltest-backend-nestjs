import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsEntity } from './entity/problems.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-problem.dto';

@Injectable()
export class TagsService {
    constructor(
            @InjectRepository(TagsEntity)
            private repository: Repository<TagsEntity>,
          ) {}
          
    getTags(){
        return this.repository.find()
    }

    createTag(dto: CreateTagDto){
        return this.repository.save(dto)
    }
}
