import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatingModule } from 'src/routes/ratings/rating.module';
import { TestTagModule } from 'src/routes/test-tag/test-tag.module';
import { TopicsModule } from 'src/routes/topics/topics.module';

import { TestsEntity } from '../../entities/tests/test.entity';
import { TestsController } from './tests.controller';
import { ProblemsModule } from 'src/routes/problems/problems.module';
import { CreateTestsService } from 'src/features/tests/create-test/create-tests.service';
import { GetTestsIdService } from 'src/features/tests/get-test-id/get-tests-id.service';
import { GetUsersTestsService } from 'src/features/tests/get-test-user/get-user-tests.service';
import { GetTestsPageService } from 'src/features/tests/get-tests-page/get-tests-page.service';
import { GetTestCorrectAnswersService } from 'src/features/tests/get-test-correct-answers/get-test-corect-answers.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    forwardRef(() => RatingModule),
    TopicsModule,
    TestTagModule,
    ProblemsModule,
    UserModule,
    TypeOrmModule.forFeature([TestsEntity]),
  ],
  controllers: [TestsController],
  providers: [
    GetTestCorrectAnswersService,
    CreateTestsService,
    GetTestsIdService,
    GetUsersTestsService,
    GetTestsPageService,
  ],
  exports: [GetTestsIdService, GetTestCorrectAnswersService],
})
export class TestsModule {}
