import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemsEntity } from '../../entities/problems/problems.entity';
import { CreateProblemService } from '../../features/problems/create-problem/create-problems.service';
import { AnswersModule } from '../answers/answers.module';
import { GetProblemService } from 'src/features/problems/get-problem/get-problem.service';

@Module({
  imports: [AnswersModule, TypeOrmModule.forFeature([ProblemsEntity])],
  controllers: [],
  providers: [CreateProblemService, GetProblemService],
  exports: [CreateProblemService, GetProblemService],
})
export class ProblemsModule {}
