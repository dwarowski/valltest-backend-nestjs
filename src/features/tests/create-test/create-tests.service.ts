import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

import { extractTokenFromCookie } from 'src/shared/utils/functions/extract-token-from-cookie/token-extract';

import { CreateTestDto } from './create-test.dto';
import { TestsEntity } from '../../../entities/tests/test.entity';
import { CreateProblemsService } from 'src/features/problems/create-problem/create-problems.service';
import { CreateAnswersService } from 'src/features/answers/create-answer/create-answers.service';
import { GetTopicService } from '../../topics/get-topic/get-topics.service';

@Injectable()
export class CreateTestsService {
  constructor(
    @Inject(GetTopicService)
    private readonly getTopicService: GetTopicService,
    @Inject(CreateProblemsService)
    private readonly createProblemsService: CreateProblemsService,
    @Inject(CreateAnswersService)
    private readonly createAnswersService: CreateAnswersService,
    @InjectRepository(TestsEntity)
    private readonly repository: Repository<TestsEntity>,
  ) {}

  async creatTest(dto: CreateTestDto, req: Request) {
    const { testName, difficulty, topicName, questions } = dto;
    const payload = await extractTokenFromCookie(req);
    const userId = payload.id;

    const topicEntity = await this.getTopicService.getTopicByName(topicName);

    if (!topicEntity) {
      throw new Error(`Topic with name: ${topicName} not found`);
    }

    const testEntity = await this.repository.save({
      testName,
      userAuthorId: userId,
      difficulty,
      topic: topicEntity,
      timeForTest: 2,
    });

    const testQuestions = await Promise.all(
      questions.map(async (question) => {
        const createdProblem = await this.createProblemsService.createProblem(
          testEntity.id,
          question,
        );
        const { test: _test, id: _id, ...cleanProblem } = createdProblem;

        await Promise.all(
          question.answers.map(async (answer) => {
            const createdAnswer = await this.createAnswersService.createAnswer(
              createdProblem.id,
              answer,
            );
            const {
              problem: _problem,
              id: _id,
              ...cleanAnswer
            } = createdAnswer;
            return cleanAnswer;
          }),
        );

        return cleanProblem;
      }),
    );

    return { ...testEntity, problems: testQuestions };
  }
}
