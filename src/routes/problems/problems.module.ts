import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemsEntity } from '../../entities/problems/problems.entity';
import { CreateProblemService } from '../../features/problems/create-problem/create-problems.service';
import { AnswersModule } from '../answers/answers.module';
import { GetProblemService } from 'src/features/problems/get-problem/get-problem.service';
import { GetTestsIdService } from 'src/features/tests/get-test-id/get-tests-id.service';
import { TestsEntity } from 'src/entities/tests/test.entity';

@Module({
  imports: [forwardRef(() => AnswersModule), TypeOrmModule.forFeature([ProblemsEntity, TestsEntity])], //TODO circular import if test module imported so using provider and entity
  controllers: [],
  providers: [CreateProblemService, GetProblemService, GetTestsIdService],
  exports: [CreateProblemService, GetProblemService],
})
export class ProblemsModule {}
