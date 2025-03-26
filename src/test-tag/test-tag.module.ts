import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestTagEntity } from './entity/test-tag.entity';
import { TestTagService } from './test-tag.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TestTagEntity])],
  providers: [TestTagService],
  exports: [TestTagService],
})
export class TestTagModule {}
