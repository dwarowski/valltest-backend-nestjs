import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubjectEntity } from './entity/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(SubjectEntity)
        private repository: Repository<SubjectEntity>,
    ) { }


    async getSubjectById(id: number) {
        return await this.repository.createQueryBuilder('subjectId')
            .where({ id: id })
            .getOne()
    }

    getSubject() {
        return this.repository.find();
    }

    createSubject(dto: CreateSubjectDto) {
        return this.repository.save(dto)
    }
}
