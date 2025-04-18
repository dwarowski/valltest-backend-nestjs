import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubjectDto } from './create-subject.dto';
import { SubjectEntity } from '../../../entities/subjects/subject.entity';

@Injectable()
export class CreateSubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  // Создать предмет
  async create(subjectData: CreateSubjectDto): Promise<SubjectEntity> {
    const subject = this.subjectRepository.create(subjectData);
    return this.subjectRepository.save(subject);
  }
}
