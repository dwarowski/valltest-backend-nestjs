import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAnswersEntity } from '../../entities/user-answers/user-answer.entity';
import { UserAnswersController } from './user-answers.controller';
import { UserAnswersService } from '../../features/users-answers/user-answers.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserAnswersEntity])],
  controllers: [UserAnswersController],
  providers: [UserAnswersService],
})
export class UserAnswersModule {}
