import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserAnswersEntity } from './entity/user-answer.entity';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';

@Injectable()
export class UserAnswersService {
    constructor(
        @InjectRepository(UserAnswersEntity)
        private repository: Repository<UserAnswersEntity>
    ) {}

    getTags(){
            return this.repository.find()
        }
    
    createTag(dto: CreateUserAnswerDto){
        return this.repository.save(dto)
    }

}
