import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from './entity/subject.entity';
import { SubjectService } from './subjects.service';
import { SubjectController } from './subjects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  providers: [SubjectService],
  controllers: [SubjectController],
})
export class SubjectsModule {}