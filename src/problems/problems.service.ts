import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsEntity } from './entity/problems.entity';
import { Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';

@Injectable()
export class ProblemsService {
    constructor(
            @InjectRepository(TagsEntity)
            private repository: Repository<TagsEntity>,
          ) {}
          
    getTags(){
        return this.repository.find()
    }

    createTag(dto: CreateProblemDto){
        return this.repository.save(dto)
    }
}
