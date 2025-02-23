import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserAnswersEntity } from './dto/user-answer.entity';

@Injectable()
export class UserAnswersService {
    constructor(
        @InjectRepository(UserAnswersEntity)
        private repository: Repository<UserAnswersEntity>
    ) {}

    getTags(){
            return this.repository.find()
        }
    
    createTag(dto: CreateProblemDto){
        return this.repository.save(dto)

}
