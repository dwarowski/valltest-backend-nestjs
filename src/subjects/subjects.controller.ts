import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SubjectService } from './subjects.service';
import { SubjectEntity } from './entity/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  // Получить все предметы
  @Get()
  async findAll(): Promise<SubjectEntity[]> {
    return this.subjectService.findAll();
  }

  // Создать предмет
  @Post()
  async create(@Body() subjectData: CreateSubjectDto): Promise<SubjectEntity> {
    return this.subjectService.create(subjectData);
  }

  // Обновить предмет
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: UpdateSubjectDto,
  ): Promise<SubjectEntity> {
    return this.subjectService.update(id, updateData);
  }

  // Удалить предмет
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.subjectService.delete(id);
  }
}
