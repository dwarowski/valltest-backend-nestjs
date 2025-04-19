import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubjectEntity } from '../../../entities/subjects/subject.entity';

@Injectable()
export class DeleteSubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  // Удалить предмет
  async delete(subjectData: string): Promise<string> {
    const result = await this.subjectRepository
    .createQueryBuilder('subject')
    .delete()
    .where({subjectName: subjectData})
    .execute()

    if (result.affected === 0) {
      throw new NotFoundException(`Subject with name: ${subjectData} not found`);
    }
    return `Subject with name: ${subjectData} deleted`
  }
}
