import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestTagEntity } from '../../entities/test-tag/test-tag.entity';
import { TestTagService } from '../../features/test-tag/test-tag.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TestTagEntity])],
  providers: [TestTagService],
  exports: [TestTagService],
})
export class TestTagModule {}
