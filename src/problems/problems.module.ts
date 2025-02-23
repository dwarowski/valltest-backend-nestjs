import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsEntity } from './entity/problems.entity';
import { ConfigModule } from '@nestjs/config';
import { TagsController } from './problems.controller';
import { TagsService } from './problems.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TagsEntity])],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
