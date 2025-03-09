import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemsEntity } from './entity/problems.entity';
import { ConfigModule } from '@nestjs/config';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ProblemsEntity])],
  controllers: [ProblemsController],
  providers: [ProblemsService]
})
export class ProblemsModule { }
