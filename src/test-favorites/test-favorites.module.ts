import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestFavoritesController } from './test-favorites.controller';
import { TestFavoritesService } from './test-favorites.service';
import { FavoriteTestEntity } from './entity/favorite-test.entity';
import { UserModule } from 'src/user/user.module';
import { TestsModule } from 'src/tests/tests.module';

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
