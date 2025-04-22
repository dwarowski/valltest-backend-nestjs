import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAnswersEntity } from '../../entities/user-answers/user-answer.entity';
import { UserAnswersController } from './user-answers.controller';
import { TestsModule } from '../tests/tests.module';
import { CheckAnswersService } from 'src/features/user-answers/check-user-answers/check-answers.serivce';
import { GetUserTestAnsweresService } from 'src/features/user-answers/get-user-test-answers/get-user-test-answers.service';
import { SaveUserAnswersService } from 'src/features/user-answers/save-user-answers/save-user-answers.service';
import { UserModule } from '../users/user.module';
import { ProblemsModule } from '../problems/problems.module';
import { AnswersModule } from '../answers/answers.module';

@Module({
  imports: [TestsModule, UserModule, ProblemsModule, AnswersModule, TypeOrmModule.forFeature([UserAnswersEntity])],
  controllers: [UserAnswersController],
  providers: [CheckAnswersService, GetUserTestAnsweresService, SaveUserAnswersService],
})
export class UserAnswersModule {}
