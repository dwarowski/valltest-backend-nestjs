import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestTagModule } from 'src/routes/test-tag/test-tag.module';
import { TestsModule } from 'src/routes/tests/tests.module';

import { TagsEntity } from '../../entities/tags/tags.entity';
import { TagsController } from './tags.controller';
import { TagsService } from 'src/features/tags/tags.service';

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
