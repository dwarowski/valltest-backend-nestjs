import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
  async execute(subjectData: CreateSubjectDto): Promise<void> {
    try {
      await this.subjectRepository.save(subjectData);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Subject with this name already exists.');
      } else {
        throw new InternalServerErrorException('Failed to create subject.');
      }
    }
  }
}
