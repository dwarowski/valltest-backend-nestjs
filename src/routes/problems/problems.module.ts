import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemsEntity } from '../../entities/problems/problems.entity';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from '../../features/problems/problems.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ProblemsEntity])],
  controllers: [ProblemsController],
  providers: [ProblemsService],
  exports: [ProblemsService],
})
export class ProblemsModule {}
