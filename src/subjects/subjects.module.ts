import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectEntity } from '../subjects/entity/subject.entity'
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';


@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([SubjectEntity])],
  controllers: [SubjectsController],
  providers: [SubjectsService]
})
export class SubjectsModule { }