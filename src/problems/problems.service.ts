import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemsEntity } from './entity/problems.entity';
import { Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';

@Injectable()
export class ProblemsService {
    constructor(
            @InjectRepository(ProblemsEntity)
            private repository: Repository<ProblemsEntity>,
          ) {}
          
    getProblem(){
        return this.repository.find()
    }

    createProblem(dto: CreateProblemDto){
        return this.repository.save(dto)
    }
}
