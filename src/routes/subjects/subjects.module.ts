import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectEntity } from '../../entities/subjects/subject.entity';
import { SubjectController } from './subjects.controller';
import { SubjectService } from '../../features/subjects/subjects.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [SubjectService],
})
export class SubjectsModule {}
