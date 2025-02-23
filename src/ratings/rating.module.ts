import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { RatingEntity } from './entity/rating.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([RatingEntity])],
  controllers: [RatingController],
  providers: [RatingService]
})
export class RatingModule {}
