import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionTestEntity } from '../../entities/test-sessions/session-test.entity';
import { TestSessionsController } from './test-sessions.controller';
import { TestSessionsService } from '../../features/test-sessions/test-sessions.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([SessionTestEntity])],
  controllers: [TestSessionsController],
  providers: [TestSessionsService],
})
export class TestSessionsModule {}
