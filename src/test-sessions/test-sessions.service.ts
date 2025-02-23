import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionTestEntity } from './entity/session-test.entity';

@Injectable()
export class TestSessionsService {
    constructor(
                @InjectRepository(SessionTestEntity)
                private repository: Repository<SessionTestEntity>,
              ) {}
              
    getSessionTestById(id: number){
        return this.repository.findOneBy({ id })
    }
}
