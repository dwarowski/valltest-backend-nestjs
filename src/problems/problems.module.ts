import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsEntity } from './entity/problems.entity';
import { ConfigModule } from '@nestjs/config';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TagsEntity])],
  controllers: [ProblemsController],
  providers: [ProblemsService]
})
export class TagsModule {}
