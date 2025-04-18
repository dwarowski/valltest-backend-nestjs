import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectEntity } from '../../entities/subjects/subject.entity';
import { SubjectController } from './subjects.controller';

import { CreateSubjectService } from 'src/features/subjects/create-subject/create-subject.service';
import { DeleteSubjectService } from 'src/features/subjects/delete-subject/delete-subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  providers: [CreateSubjectService, DeleteSubjectService],
  controllers: [SubjectController],
  exports: [],
})
export class SubjectsModule {}
