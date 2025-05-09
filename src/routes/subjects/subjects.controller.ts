import { Controller, Post, Body, Param, Delete } from '@nestjs/common';

import { CreateSubjectDto } from '../../features/subjects/create-subject/create-subject.dto';
import { SubjectEntity } from '../../entities/subjects/subject.entity';
import { CreateSubjectService } from 'src/features/subjects/create-subject/create-subject.service';
import { DeleteSubjectService } from 'src/features/subjects/delete-subject/delete-subject.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('subjects')
export class SubjectController {
  constructor(
    private readonly creaeteSubjectService: CreateSubjectService,
    private readonly deleteSubjectSerivce: DeleteSubjectService,
  ) {}

  // Создать предмет
  @Post()
  @ApiOperation({
    summary: 'Create subject',
    description: 'Create unique subject',
  })
  async create(@Body() subjectData: CreateSubjectDto): Promise<SubjectEntity> {
    return this.creaeteSubjectService.execute(subjectData);
  }

  // Удалить предмет
  @Delete(':subject')
  @ApiOperation({
    summary: 'Delete subject',
    description: 'Delete subject by name',
  })
  async delete(@Param('subject') subject: string): Promise<string> {
    return await this.deleteSubjectSerivce.execute({ subjectName: subject });
  }
}
