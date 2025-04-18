import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersModule } from './routes/answers/answers.module';
import { AuthModule } from './routes/auth/auth.module';
import { getPostgresConfig } from './shared/db/configs/postgres.config';
import { RolesGuards } from './shared/utils/guards/roles.guard';
import { ProblemsModule } from './routes/problems/problems.module';
import { RatingModule } from './routes/ratings/rating.module';
import { RolesModule } from './routes/roles/roles.module';
import { RolesUsersModule } from './routes/roles-users/roles-users.module';
import { SubjectsModule } from './routes/subjects/subjects.module';
import { TagsModule } from './routes/tags/tags.module';
import { TestFavoritesModule } from './routes/test-favorites/test-favorites.module';
import { TestSessionsModule } from './routes/test-sessions/test-sessions.module';
import { TestTagModule } from './routes/test-tag/test-tag.module';
import { TestsModule } from './routes/tests/tests.module';
import { TopicsModule } from './routes/topics/topics.module';
import { UserModule } from './routes/users/user.module';
import { UserAnswersModule } from './routes/users-answers/user-answers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    TestsModule,
    TopicsModule,
    SubjectsModule,
    TagsModule,
    TestFavoritesModule,
    RatingModule,
    TestSessionsModule,
    ProblemsModule,
    UserModule,
    AuthModule,
    UserAnswersModule,
    AnswersModule,
    TestTagModule,
    RolesModule,
    RolesUsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuards,
    },
  ],
})
export class AppModule {}
