import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemsEntity } from './entity/problems.entity';
import { Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemsService {
    constructor(
            @InjectRepository(ProblemsEntity)
            private repository: Repository<ProblemsEntity>,
          ) {}
          
    getProblem(){
        return this.repository.find()
    }

    createProblem(id: number, dto: CreateProblemDto){
        return this.repository.save({...dto, test: id}
        )
    }

    async deleteProblem(id: number){
        return await this.repository.createQueryBuilder('testDelete')
        .delete()
        .where({id: id})
        .execute();

    }

    
}
