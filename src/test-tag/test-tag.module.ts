import { Module } from '@nestjs/common';
import { TestTagService } from './test-tag.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestTagEntity } from './entity/test-tag.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TestTagEntity])],
  providers: [TestTagService]
})
export class TestTagModule {}
