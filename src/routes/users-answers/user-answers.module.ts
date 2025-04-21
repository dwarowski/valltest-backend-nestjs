import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAnswersEntity } from '../../entities/user-answers/user-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnswersEntity])],
  controllers: [],
  providers: [],
})
export class UserAnswersModule {}
