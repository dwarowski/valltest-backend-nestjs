import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestTagEntity } from '../../entities/test-tag/test-tag.entity';
import { CreateRelationTestTagService } from 'src/features/test-tag/create-relation/create-relation-test-tag.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TestTagEntity])],
  providers: [CreateRelationTestTagService],
  exports: [CreateRelationTestTagService],
})
export class TestTagModule {}
