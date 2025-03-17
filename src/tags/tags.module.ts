import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsEntity } from './entity/tags.entity';
import { ConfigModule } from '@nestjs/config';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TestsModule } from 'src/tests/tests.module';
import { TestTagModule } from 'src/test-tag/test-tag.module';

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
