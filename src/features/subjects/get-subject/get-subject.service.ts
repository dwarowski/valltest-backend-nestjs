import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from 'src/entities/subjects/subject.entity';
import { Repository } from 'typeorm';
import { GetSubjectDto } from './get-subject.dto';

@Injectable()
export class GetSubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  async execute(dto: GetSubjectDto) {
    const subject = await this.subjectRepository.findOne({
      where: { subjectName: dto.subjectName },
    });
    if (!subject) {
      throw new NotFoundException(
        `Subject with Name: ${dto.subjectName} not found`,
      );
    }
    return subject;
  }
}
