import { Controller, Post, Body, Delete } from '@nestjs/common';

import { CreateSubjectDto } from '../../features/subjects/create-subject/create-subject.dto';
import { CreateSubjectService } from 'src/features/subjects/create-subject/create-subject.service';
import { DeleteSubjectService } from 'src/features/subjects/delete-subject/delete-subject.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteSubjectDto } from 'src/features/subjects/delete-subject/delete-subject.dto';

@ApiTags('Subjects')
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
  async create(@Body() subjectData: CreateSubjectDto): Promise<void> {
    return this.creaeteSubjectService.execute(subjectData);
  }

  // Удалить предмет
  @Delete()
  @ApiOperation({
    summary: 'Delete subject',
    description: 'Delete subject by name',
  })
  async delete(@Body() subjectDto: DeleteSubjectDto): Promise<void> {
    return await this.deleteSubjectSerivce.execute(subjectDto);
  }
}
