import { Module } from '@nestjs/common';
import { UserAnswersController } from './user-answers.controller';
import { UserAnswersService } from './user-answers.service';
import { UserAnswersEntity } from './entity/user-answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserAnswersEntity])],
  controllers: [UserAnswersController],
  providers: [UserAnswersService],
})
export class UserAnswersModule {}
