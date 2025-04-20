import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemsEntity } from '../../entities/problems/problems.entity';
import { CreateProblemService } from '../../features/problems/create-problem/create-problems.service';
import { AnswersModule } from '../answers/answers.module';

@Module({
  imports: [AnswersModule, TypeOrmModule.forFeature([ProblemsEntity])],
  controllers: [],
  providers: [CreateProblemService],
  exports: [CreateProblemService],
})
export class ProblemsModule {}
