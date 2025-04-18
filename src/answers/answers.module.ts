import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { AnswersEntity } from './entity/answers.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([AnswersEntity])],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
