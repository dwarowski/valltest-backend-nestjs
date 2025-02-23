import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersEntity } from './entity/answers.entity';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([AnswersEntity])],
    controllers: [AnswersController],
    providers: [AnswersService]
})
export class AnswersModule {}
