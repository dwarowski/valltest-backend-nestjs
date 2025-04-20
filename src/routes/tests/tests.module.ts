import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatingModule } from 'src/routes/ratings/rating.module';
import { TestTagModule } from 'src/routes/test-tag/test-tag.module';
import { TopicsModule } from 'src/routes/topics/topics.module';

import { TestsEntity } from '../../entities/tests/test.entity';
import { TestsController } from './tests.controller';
import { ProblemsModule } from 'src/routes/problems/problems.module';
import { CreateTestsService } from 'src/features/tests/create-test/create-tests.service';
import { DeleteTestsService } from 'src/features/tests/delete-test/delete-tests.service';
import { GetTestsIdService } from 'src/features/tests/get-test-id/get-tests-id.service';
import { GetUsersTestsService } from 'src/features/tests/get-test-user/get-user-tests.service';
import { GetTestsPageService } from 'src/features/tests/get-tests-page/get-tests-page.service';

@Module({
  imports: [
    forwardRef(() => RatingModule),
    TopicsModule,
    TestTagModule,
    ProblemsModule,
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
    GetTestsIdService,
    GetUsersTestsService,
    GetTestsPageService,
  ],
  exports: [GetTestsIdService],
})
export class TestsModule {}
