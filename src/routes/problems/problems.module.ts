import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemsEntity } from '../../entities/problems/problems.entity';
import { ProblemsService } from '../../features/problems/create-problem/problems.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ProblemsEntity])],
  controllers: [],
  providers: [ProblemsService],
  exports: [ProblemsService],
})
export class ProblemsModule {}
