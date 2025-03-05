import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswersEntity } from './entity/answers.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(AnswersEntity)
        private repository: Repository<AnswersEntity>
    ) {}
    getAnswers(){
            return this.repository.find()
        }
    
    createAnswer(id: number, dto: CreateAnswerDto){
        return this.repository.save({...dto, problem: id})
    }
}
