import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatingModule } from 'src/routes/ratings/rating.module';
import { TestTagModule } from 'src/routes/test-tag/test-tag.module';
import { TopicsModule } from 'src/routes/topics/topics.module';

import { TestsEntity } from '../../entities/tests/test.entity';
import { TestsController } from './tests.controller';
import { TestsService } from '../../features/tests/tests.service';
import { ProblemsModule } from 'src/routes/problems/problems.module';
import { AnswersModule } from 'src/routes/answers/answers.module';

@Module({
  imports: [
    ConfigModule,
    RatingModule,
    TopicsModule,
    TestTagModule,
    ProblemsModule,
    AnswersModule,
    TypeOrmModule.forFeature([TestsEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService],
})
export class TestsModule {}
