import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersEntity } from '../../entities/answers/answers.entity';
import { CreateAnswersService } from 'src/features/answers/create-answer/create-answers.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([AnswersEntity])],
  controllers: [],
  providers: [CreateAnswersService],
  exports: [CreateAnswersService],
})
export class AnswersModule {}
