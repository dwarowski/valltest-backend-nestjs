import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestsModule } from 'src/routes/tests/tests.module';
import { UserModule } from 'src/routes/users/user.module';

import { FavoriteTestEntity } from '../../entities/test-favorites/favorite-test.entity';
import { TestFavoritesController } from './test-favorites.controller';
import { TestFavoritesService } from '../../features/test-favorites/test-favorites.service';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    TestsModule,
    TypeOrmModule.forFeature([FavoriteTestEntity]),
  ],
  controllers: [TestFavoritesController],
  providers: [TestFavoritesService],
  exports: [TestFavoritesService],
})
export class TestFavoritesModule {}
