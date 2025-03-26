import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAnswersEntity } from './entity/user-answer.entity';
import { UserAnswersController } from './user-answers.controller';
import { UserAnswersService } from './user-answers.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserAnswersEntity])],
  controllers: [UserAnswersController],
  providers: [UserAnswersService],
})
export class UserAnswersModule {}
