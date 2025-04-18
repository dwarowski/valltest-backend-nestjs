import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemsEntity } from '../../entities/problems/problems.entity';
import { CreateProblemsService } from '../../features/problems/create-problem/create-problems.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ProblemsEntity])],
  controllers: [],
  providers: [CreateProblemsService],
  exports: [CreateProblemsService],
})
export class ProblemsModule {}
