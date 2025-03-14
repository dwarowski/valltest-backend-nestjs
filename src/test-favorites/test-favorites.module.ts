import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestFavoritesController } from './test-favorites.controller';
import { TestFavoritesService } from './test-favorites.service';
import { FavoriteTestEntity } from './entity/favorite-test.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([FavoriteTestEntity, User])],
  controllers: [TestFavoritesController],
  providers: [TestFavoritesService]
})
export class TestFavoritesModule {}
