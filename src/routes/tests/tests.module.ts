import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatingModule } from 'src/routes/ratings/rating.module';
import { TestTagModule } from 'src/routes/test-tag/test-tag.module';
import { TopicsModule } from 'src/routes/topics/topics.module';

import { TestsEntity } from '../../entities/tests/test.entity';
import { TestsController } from './tests.controller';
import { ProblemsModule } from 'src/routes/problems/problems.module';
import { AnswersModule } from 'src/routes/answers/answers.module';
import { CreateTestsService } from 'src/features/tests/create-test/create-tests.service';
import { DeleteTestsService } from 'src/features/tests/delete-test/delete-tests.service';
import { GetTestsEntityByIdService } from 'src/features/tests/get-test-entity-id/get-tests-entity-id.service';
import { GetTestsIdService } from 'src/features/tests/get-test-id/get-tests-id.service';
import { GetUsersTestsService } from 'src/features/tests/get-test-user/get-user-tests.service';
import { GetTestsPageService } from 'src/features/tests/get-tests-page/get-tests-page.service';

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
  providers: [
    CreateTestsService,
    DeleteTestsService,
    GetTestsEntityByIdService,
    GetTestsIdService,
    GetUsersTestsService,
    GetTestsPageService
  ],
  exports: [GetTestsEntityByIdService],
})
export class TestsModule {}
