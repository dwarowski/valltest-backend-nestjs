import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAnswersEntity } from '../../entities/user-answers/user-answer.entity';
import { UserAnswersController } from './user-answers.controller';
import { TestsModule } from '../tests/tests.module';
import { CheckAnswersService } from 'src/features/user-answers/check-user-answers/check-answers.serivce';

@Module({
  imports: [TestsModule ,TypeOrmModule.forFeature([UserAnswersEntity])],
  controllers: [UserAnswersController],
  providers: [CheckAnswersService],
})
export class UserAnswersModule {}
