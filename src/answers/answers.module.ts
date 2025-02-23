import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersEntity } from './entity/answers.entity';
import { UserAnswersController } from 'src/user-answers/user-answers.controller';
import { UserAnswersService } from 'src/user-answers/user-answers.service';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([AnswersEntity])],
    controllers: [UserAnswersController],
    providers: [UserAnswersService]
})
export class AnswersModule {}
