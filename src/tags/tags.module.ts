import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestTagModule } from 'src/test-tag/test-tag.module';
import { TestsModule } from 'src/tests/tests.module';

import { TagsEntity } from './entity/tags.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [
    ConfigModule,
    TestsModule,
    TestTagModule,
    TypeOrmModule.forFeature([TagsEntity]),
  ],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
