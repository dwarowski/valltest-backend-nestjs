import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  ConfigModule, 
  ConfigService 
} from '@nestjs/config';

import { getPostgresConfig } from './configs/postgres.config';
import { TestsModule } from './tests/tests.module';
import { TopicsModule } from './topics/topics.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TagsModule } from './tags/tags.module';
import { TestFavoritesModule } from './test-favorites/test-favorites.module';
import { RatingModule } from './ratings/rating.module';
import { TestSessionsModule } from './test-sessions/test-sessions.module';
import { ProblemsModule } from './problems/problems.module';
import { AnswersModule } from './answers/answers.module';
import { UserAnswersModule } from './user-answers/user-answers.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
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
  AnswersModule],
})
export class AppModule {}
