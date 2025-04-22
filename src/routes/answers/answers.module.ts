import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersEntity } from '../../entities/answers/answers.entity';
import { CreateAnswerService } from 'src/features/answers/create-answer/create-answers.service';
import { GetAnswerService } from 'src/features/answers/get-answer/get-answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswersEntity])],
  controllers: [],
  providers: [CreateAnswerService, GetAnswerService],
  exports: [CreateAnswerService, GetAnswerService],
})
export class AnswersModule {}
