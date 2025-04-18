import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestTagEntity } from '../../entities/test-tag/test-tag.entity';
import { CreateRelationTestTagService } from 'src/features/test-tag/create-relation/create-relation-test-tag.service';
import { DeleteRelationTestTagService } from 'src/features/test-tag/delete-relation/delete-relation-test-tag.service';
import { GetTagByNameService } from 'src/features/test-tag/get-tag-by-name/get-tag-by-name.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TestTagEntity])],
  providers: [CreateRelationTestTagService, DeleteRelationTestTagService, GetTagByNameService],
  exports: [GetTagByNameService, CreateRelationTestTagService, DeleteRelationTestTagService],
})
export class TestTagModule {}
