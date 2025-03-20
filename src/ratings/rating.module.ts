import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './entity/rating.entity';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { User } from '../user/entities/user.entity'; // Импортируем User
import { TestsEntity } from '../tests/entity/test.entity'; // Импортируем TestsEntity

@Module({
  imports: [
    TypeOrmModule.forFeature([RatingEntity, User, TestsEntity]), // Добавляем User и TestsEntity
  ],
  providers: [RatingService],
  controllers: [RatingController],
  exports: [RatingService],
})
export class RatingModule {}
