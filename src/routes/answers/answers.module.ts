import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersEntity } from '../../entities/answers/answers.entity';
import { CreateAnswerService } from 'src/features/answers/create-answer/create-answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswersEntity])],
  controllers: [],
  providers: [CreateAnswerService],
  exports: [CreateAnswerService],
})
export class AnswersModule {}
