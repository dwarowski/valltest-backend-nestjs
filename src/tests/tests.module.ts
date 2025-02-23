import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { TestsEntity } from './entity/test.entity';


@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TestsEntity])],
  controllers: [TestsController],
  providers: [TestsService]
})
export class TestsModule {}
