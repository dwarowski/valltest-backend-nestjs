import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemsEntity } from '../../entities/problems/problems.entity';
import { CreateProblemsService } from '../../features/problems/create-problem/create-problems.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProblemsEntity])],
  controllers: [],
  providers: [CreateProblemsService],
  exports: [CreateProblemsService],
})
export class ProblemsModule {}
