import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from './entity/test.entity';
import { CreateTestDto } from './dto/create-test.dto';

@Injectable()
export class TestsService {
    constructor(
        @InjectRepository(TestsEntity)
        private repository: Repository<TestsEntity>,
      ) {}

    getTests(){
        return this.repository.find();  
    }

    creatTest(dto: CreateTestDto){
        return this.repository.save(dto)
    }
}
