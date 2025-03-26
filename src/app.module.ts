import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersModule } from './answers/answers.module';
import { AuthModule } from './auth/auth.module';
import { getPostgresConfig } from './configs/postgres.config';
import { RolesGuards } from './guards/roles.guard';
import { ProblemsModule } from './problems/problems.module';
import { RatingModule } from './ratings/rating.module';
import { RolesModule } from './roles/roles.module';
import { RolesUsersModule } from './roles-users/roles-users.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TagsModule } from './tags/tags.module';
import { TestFavoritesModule } from './test-favorites/test-favorites.module';
import { TestSessionsModule } from './test-sessions/test-sessions.module';
import { TestTagModule } from './test-tag/test-tag.module';
import { TestsModule } from './tests/tests.module';
import { TopicsModule } from './topics/topics.module';
import { UserModule } from './user/user.module';
import { UserAnswersModule } from './user-answers/user-answers.module';

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
