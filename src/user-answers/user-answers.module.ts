import { Module } from '@nestjs/common';
import { UserAnswersController } from './user-answers.controller';
import { UserAnswersService } from './user-answers.service';

@Module({
  controllers: [UserAnswersController],
  providers: [UserAnswersService]
})
export class UserAnswersModule {}
