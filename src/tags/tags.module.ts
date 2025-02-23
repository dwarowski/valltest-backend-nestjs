import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsEntity } from './entity/tags.entity';
import { ConfigModule } from '@nestjs/config';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TagsEntity])],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
