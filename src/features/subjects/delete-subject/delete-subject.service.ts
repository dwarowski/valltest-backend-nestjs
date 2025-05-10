import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubjectEntity } from '../../../entities/subjects/subject.entity';
import { DeleteSubjectDto } from './delete-subject.dto';

@Injectable()
export class DeleteSubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  // Удалить предмет
  async execute(dto: DeleteSubjectDto): Promise<void> {
    const result = await this.subjectRepository
      .createQueryBuilder('subject')
      .delete()
      .where({ subjectName: dto.subjectName })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(
        `Subject with name: ${dto.subjectName} not found`,
      );
    }
  }
}
