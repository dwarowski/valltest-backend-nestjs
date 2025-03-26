import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestsEntity } from '../tests/entity/test.entity'; // Импортируем TestsEntity
import { User } from '../user/entities/user.entity'; // Импортируем User

import { RatingEntity } from './entity/rating.entity';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RatingEntity, User, TestsEntity]), // Добавляем User и TestsEntity
  ],
  providers: [RatingService],
  controllers: [RatingController],
  exports: [RatingService],
})
export class RatingModule {}
