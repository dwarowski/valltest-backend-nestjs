import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestTagModule } from 'src/routes/test-tag/test-tag.module';
import { TestsModule } from 'src/routes/tests/tests.module';

import { TagsEntity } from '../../entities/tags/tags.entity';
import { TagsController } from './tags.controller';

import { CreateTagService } from 'src/features/tags/create-tag/create-tag.service';
import { DeleteTagService } from 'src/features/tags/delete-tag/delete-tag.service';

@Module({
  imports: [TestsModule, TestTagModule, TypeOrmModule.forFeature([TagsEntity])],
  controllers: [TagsController],
  providers: [CreateTagService, DeleteTagService],
  exports: [],
})
export class TagsModule {}
