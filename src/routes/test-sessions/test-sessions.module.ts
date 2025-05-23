import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionTestEntity } from '../../entities/test-sessions/session-test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionTestEntity])],
  controllers: [],
  providers: [],
})
export class TestSessionsModule {}
