import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { TestsEntity } from './entity/test.entity';
import { RatingModule } from 'src/ratings/rating.module';
import { TopicsModule } from 'src/topics/topics.module';
import { TestTagModule } from 'src/test-tag/test-tag.module';

@Module({
  imports: [
    ConfigModule,
    RatingModule,
    TopicsModule,
    TestTagModule,
    TypeOrmModule.forFeature([TestsEntity]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService],
})
export class TestsModule {}
