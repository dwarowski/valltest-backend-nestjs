import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestsEntity } from '../../entities/tests/test.entity'; // Импортируем TestsEntity
import { User } from 'src/entities/users/user.entity'; // Импортируем User

import { RatingEntity } from '../../entities/ratings/rating.entity';
import { RatingController } from './rating.controller';
import { RatingService } from 'src/features/ratings/rating.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RatingEntity, User, TestsEntity]), // Добавляем User и TestsEntity
  ],
  providers: [RatingService],
  controllers: [RatingController],
  exports: [RatingService],
})
export class RatingModule {}
