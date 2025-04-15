import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatingModule } from 'src/ratings/rating.module';
import { TestTagModule } from 'src/test-tag/test-tag.module';
import { TopicsModule } from 'src/topics/topics.module';

import { TestsEntity } from './entity/test.entity';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';

@Module({
  imports: [
    ConfigModule,
    RatingModule,
    TopicsModule,
    TestTagModule,
    TypeOrmModule.forFeature([TestsEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService],
})
export class TestsModule {}
